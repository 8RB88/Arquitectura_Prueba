// =============================================
// CLIENTE - JavaScript de la Capa de Presentación
// =============================================

const API_BASE_URL = 'http://localhost:3000/api';

// ============ NAVEGACIÓN ============
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Remover clase active de todos los botones
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Ocultar todas las secciones
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

        // Mostrar sección seleccionada
        const sectionId = this.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');

        // Cargar datos según la sección
        if (sectionId === 'productos') {
            cargarProductos();
        } else if (sectionId === 'pedidos') {
            cargarPedidos();
            cargarEstadisticas();
        } else if (sectionId === 'artesanas') {
            cargarArtesanas();
        } else if (sectionId === 'eventos') {
            cargarEventos();
        }
    });
});

// ============ UTILIDADES ============
function mostrarMensaje(mensaje, tipo = 'success') {
    const div = document.createElement('div');
    div.className = `message ${tipo}`;
    div.textContent = mensaje;
    document.body.insertBefore(div, document.body.firstChild);
    setTimeout(() => div.remove(), 3000);
}

async function hacerPeticion(url, opciones = {}) {
    try {
        const response = await fetch(url, opciones);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error en la petición');
        }
        return data;
    } catch (error) {
        mostrarMensaje(error.message, 'error');
        throw error;
    }
}

// ============ PRODUCTOS ============
document.getElementById('formProducto')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const producto = {
        nombre: document.getElementById('prodNombre').value,
        tipo: document.getElementById('prodTipo').value,
        descripcion: document.getElementById('prodDescripcion').value,
        materiales: document.getElementById('prodMateriales').value,
        precio: parseFloat(document.getElementById('prodPrecio').value),
        stock: parseInt(document.getElementById('prodStock').value),
        artesana_id: document.getElementById('prodArtesanaId').value || null
    };

    try {
        await hacerPeticion(`${API_BASE_URL}/productos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        
        mostrarMensaje('Producto creado exitosamente', 'success');
        document.getElementById('formProducto').reset();
        cargarProductos();
    } catch (error) {
        console.error('Error:', error);
    }
});

async function cargarProductos() {
    try {
        const data = await hacerPeticion(`${API_BASE_URL}/productos`);
        const container = document.getElementById('productosContainer');
        
        if (data.datos.length === 0) {
            container.innerHTML = '<p>No hay productos registrados.</p>';
            return;
        }

        container.innerHTML = data.datos.map(producto => `
            <div class="card">
                <h4>${producto.nombre}</h4>
                <p><strong>Tipo:</strong> ${producto.tipo}</p>
                <p><strong>Descripción:</strong> ${producto.descripcion || 'N/A'}</p>
                <p><strong>Materiales:</strong> ${producto.materiales || 'N/A'}</p>
                <p><strong>Precio:</strong> $${producto.precio}</p>
                <p><strong>Stock:</strong> ${producto.stock}</p>
                <p><strong>Artesana:</strong> ${producto.artesana_nombre || 'N/A'}</p>
                <div class="card-actions">
                    <button class="btn-edit" onclick="editarProducto(${producto.id})">Editar</button>
                    <button class="btn-delete" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

async function eliminarProducto(id) {
    if (!confirm('¿Está seguro de que desea eliminar este producto?')) return;
    
    try {
        await hacerPeticion(`${API_BASE_URL}/productos/${id}`, {
            method: 'DELETE'
        });
        mostrarMensaje('Producto eliminado exitosamente', 'success');
        cargarProductos();
    } catch (error) {
        console.error('Error:', error);
    }
}

function editarProducto(id) {
    mostrarMensaje('Función de edición en desarrollo', 'error');
}

// ============ PEDIDOS ============
document.getElementById('formPedido')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const pedido = {
        cliente_nombre: document.getElementById('pedCliente').value,
        cliente_email: document.getElementById('pedEmail').value,
        monto_total: parseFloat(document.getElementById('pedMonto').value),
        forma_pago: document.getElementById('pedForma').value,
        estado: 'pendiente'
    };

    try {
        await hacerPeticion(`${API_BASE_URL}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedido)
        });
        
        mostrarMensaje('Pedido registrado exitosamente', 'success');
        document.getElementById('formPedido').reset();
        cargarPedidos();
        cargarEstadisticas();
    } catch (error) {
        console.error('Error:', error);
    }
});

async function cargarPedidos() {
    try {
        const data = await hacerPeticion(`${API_BASE_URL}/pedidos`);
        const container = document.getElementById('pedidosContainer');
        
        if (data.datos.length === 0) {
            container.innerHTML = '<p>No hay pedidos registrados.</p>';
            return;
        }

        const html = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Email</th>
                        <th>Monto</th>
                        <th>Forma Pago</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.datos.map(pedido => `
                        <tr>
                            <td>${pedido.id}</td>
                            <td>${pedido.cliente_nombre}</td>
                            <td>${pedido.cliente_email || 'N/A'}</td>
                            <td>$${pedido.monto_total}</td>
                            <td>${pedido.forma_pago || 'N/A'}</td>
                            <td>
                                <select onchange="cambiarEstadoPedido(${pedido.id}, this.value)">
                                    <option value="pendiente" ${pedido.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                                    <option value="enviado" ${pedido.estado === 'enviado' ? 'selected' : ''}>Enviado</option>
                                    <option value="entregado" ${pedido.estado === 'entregado' ? 'selected' : ''}>Entregado</option>
                                    <option value="cancelado" ${pedido.estado === 'cancelado' ? 'selected' : ''}>Cancelado</option>
                                </select>
                            </td>
                            <td>${new Date(pedido.fecha).toLocaleDateString('es-ES')}</td>
                            <td>
                                <button class="btn-delete" onclick="eliminarPedido(${pedido.id})">Eliminar</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        container.innerHTML = html;
    } catch (error) {
        console.error('Error al cargar pedidos:', error);
    }
}

async function cambiarEstadoPedido(id, estado) {
    try {
        await hacerPeticion(`${API_BASE_URL}/pedidos/${id}/estado`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado })
        });
        mostrarMensaje(`Pedido actualizado a estado: ${estado}`, 'success');
        cargarEstadisticas();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function eliminarPedido(id) {
    if (!confirm('¿Está seguro de que desea eliminar este pedido?')) return;
    mostrarMensaje('Función de eliminación en desarrollo', 'error');
}

async function cargarEstadisticas() {
    try {
        const data = await hacerPeticion(`${API_BASE_URL}/pedidos`);
        const pedidos = data.datos || [];
        
        const stats = {
            total: pedidos.length,
            montoTotal: pedidos.reduce((sum, p) => sum + p.monto_total, 0),
            pendiente: pedidos.filter(p => p.estado === 'pendiente').length,
            enviado: pedidos.filter(p => p.estado === 'enviado').length,
            entregado: pedidos.filter(p => p.estado === 'entregado').length
        };

        const container = document.getElementById('statsContainer');
        container.innerHTML = `
            <div class="stat-card">
                <h4>Total de Pedidos</h4>
                <div class="number">${stats.total}</div>
            </div>
            <div class="stat-card">
                <h4>Monto Total</h4>
                <div class="number">$${stats.montoTotal.toFixed(2)}</div>
            </div>
            <div class="stat-card">
                <h4>Pendientes</h4>
                <div class="number">${stats.pendiente}</div>
            </div>
            <div class="stat-card">
                <h4>Enviados</h4>
                <div class="number">${stats.enviado}</div>
            </div>
            <div class="stat-card">
                <h4>Entregados</h4>
                <div class="number">${stats.entregado}</div>
            </div>
        `;
    } catch (error) {
        console.error('Error al cargar estadísticas:', error);
    }
}

// ============ ARTESANAS ============
document.getElementById('formArtesana')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const artesana = {
        nombre: document.getElementById('artNombre').value,
        especialidad: document.getElementById('artEspecialidad').value,
        telefono: document.getElementById('artTelefono').value,
        email: document.getElementById('artEmail').value
    };

    try {
        await hacerPeticion(`${API_BASE_URL}/artesanas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(artesana)
        });
        
        mostrarMensaje('Artesana registrada exitosamente', 'success');
        document.getElementById('formArtesana').reset();
        cargarArtesanas();
    } catch (error) {
        console.error('Error:', error);
    }
});

async function cargarArtesanas() {
    try {
        const data = await hacerPeticion(`${API_BASE_URL}/artesanas`);
        const container = document.getElementById('artesanasContainer');
        
        if (data.datos.length === 0) {
            container.innerHTML = '<p>No hay artesanas registradas.</p>';
            return;
        }

        container.innerHTML = data.datos.map(artesana => `
            <div class="card">
                <h4>${artesana.nombre}</h4>
                <p><strong>Especialidad:</strong> ${artesana.especialidad}</p>
                <p><strong>Teléfono:</strong> ${artesana.telefono || 'N/A'}</p>
                <p><strong>Email:</strong> ${artesana.email || 'N/A'}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error al cargar artesanas:', error);
    }
}

// ============ EVENTOS ============
document.getElementById('formEvento')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const evento = {
        nombre: document.getElementById('evNombre').value,
        descripcion: document.getElementById('evDescripcion').value,
        fecha: document.getElementById('evFecha').value,
        ubicacion: document.getElementById('evUbicacion').value
    };

    try {
        await hacerPeticion(`${API_BASE_URL}/eventos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(evento)
        });
        
        mostrarMensaje('Evento creado exitosamente', 'success');
        document.getElementById('formEvento').reset();
        cargarEventos();
    } catch (error) {
        console.error('Error:', error);
    }
});

async function cargarEventos() {
    try {
        const data = await hacerPeticion(`${API_BASE_URL}/eventos`);
        const container = document.getElementById('eventosContainer');
        
        if (data.datos.length === 0) {
            container.innerHTML = '<p>No hay eventos registrados.</p>';
            return;
        }

        container.innerHTML = data.datos.map(evento => `
            <div class="card">
                <h4>${evento.nombre}</h4>
                <p><strong>Descripción:</strong> ${evento.descripcion || 'N/A'}</p>
                <p><strong>Fecha:</strong> ${new Date(evento.fecha).toLocaleDateString('es-ES')}</p>
                <p><strong>Ubicación:</strong> ${evento.ubicacion || 'N/A'}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error al cargar eventos:', error);
    }
}
