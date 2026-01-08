// ============================================
// SCRIPT DE PRUEBA - Carga datos de ejemplo
// Ejecutar: node test-data.js
// ============================================

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'data/sgvaps.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error:', err);
        process.exit(1);
    }
    console.log('Conectado a la base de datos');
    cargarDatos();
});

function cargarDatos() {
    // Insertar Artesanas
    const artesanas = [
        { nombre: 'María Quichimbo', especialidad: 'bisutería', telefono: '0987654321', email: 'maria@saraguro.com' },
        { nombre: 'Rosa Pachacuti', especialidad: 'textiles', telefono: '0987654322', email: 'rosa@saraguro.com' },
        { nombre: 'Carmen López', especialidad: 'cuero', telefono: '0987654323', email: 'carmen@saraguro.com' }
    ];

    artesanas.forEach(a => {
        db.run(
            'INSERT INTO artesanas (nombre, especialidad, telefono, email) VALUES (?, ?, ?, ?)',
            [a.nombre, a.especialidad, a.telefono, a.email],
            function(err) {
                if (err) console.error('Error:', err);
                else console.log(`✓ Artesana "${a.nombre}" insertada`);
            }
        );
    });

    // Insertar Productos
    setTimeout(() => {
        const productos = [
            { nombre: 'Collar Tradicional', tipo: 'collar', descripcion: 'Collar con diseño tradicional de Saraguro', materiales: 'cuentas de vidrio, hilo', precio: 25.00, stock: 10, artesana_id: 1 },
            { nombre: 'Aretes de Plata', tipo: 'arete', descripcion: 'Aretes con acabados de plata', materiales: 'plata, cristal', precio: 15.00, stock: 20, artesana_id: 1 },
            { nombre: 'Manilla Tejida', tipo: 'manilla', descripcion: 'Manilla hecha a mano con técnica tradicional', materiales: 'lana de colores', precio: 12.00, stock: 15, artesana_id: 2 },
            { nombre: 'Cartera Artesanal', tipo: 'cartera', descripcion: 'Bolsa tejida a mano', materiales: 'cuero y tela', precio: 45.00, stock: 8, artesana_id: 3 },
            { nombre: 'Collar Moderno', tipo: 'collar', descripcion: 'Collar con diseño moderno y tradicional', materiales: 'cuentas de vidrio, plata', precio: 30.00, stock: 12, artesana_id: 1 }
        ];

        productos.forEach(p => {
            db.run(
                'INSERT INTO productos (nombre, tipo, descripcion, materiales, precio, stock, artesana_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [p.nombre, p.tipo, p.descripcion, p.materiales, p.precio, p.stock, p.artesana_id],
                function(err) {
                    if (err) console.error('Error:', err);
                    else console.log(`✓ Producto "${p.nombre}" insertado`);
                }
            );
        });
    }, 1000);

    // Insertar Pedidos
    setTimeout(() => {
        const pedidos = [
            { cliente_nombre: 'Juan García', cliente_email: 'juan@example.com', estado: 'entregado', monto_total: 85.00, forma_pago: 'efectivo' },
            { cliente_nombre: 'Ana Martínez', cliente_email: 'ana@example.com', estado: 'enviado', monto_total: 42.00, forma_pago: 'transferencia' },
            { cliente_nombre: 'Carlos Rodríguez', cliente_email: 'carlos@example.com', estado: 'pendiente', monto_total: 57.00, forma_pago: 'tarjeta' }
        ];

        pedidos.forEach(p => {
            db.run(
                'INSERT INTO pedidos (cliente_nombre, cliente_email, estado, monto_total, forma_pago) VALUES (?, ?, ?, ?, ?)',
                [p.cliente_nombre, p.cliente_email, p.estado, p.monto_total, p.forma_pago],
                function(err) {
                    if (err) console.error('Error:', err);
                    else console.log(`✓ Pedido para "${p.cliente_nombre}" insertado`);
                }
            );
        });
    }, 2000);

    // Insertar Eventos
    setTimeout(() => {
        const eventos = [
            { nombre: 'Feria de Artesanías de Saraguro', descripcion: 'Exposición y venta de productos artesanales', fecha: '2025-03-01', ubicacion: 'Plaza Central de Saraguro' },
            { nombre: 'Taller de Bisutería Tradicional', descripcion: 'Capacitación en técnicas tradicionales', fecha: '2025-02-15', ubicacion: 'Centro Comunitario' },
            { nombre: 'Festival Cultural Saraguro', descripcion: 'Celebración de la cultura y tradición saragurina', fecha: '2025-06-21', ubicacion: 'Saraguro, Ecuador' }
        ];

        eventos.forEach(e => {
            db.run(
                'INSERT INTO eventos (nombre, descripcion, fecha, ubicacion) VALUES (?, ?, ?, ?)',
                [e.nombre, e.descripcion, e.fecha, e.ubicacion],
                function(err) {
                    if (err) console.error('Error:', err);
                    else console.log(`✓ Evento "${e.nombre}" insertado`);
                }
            );
        });
    }, 3000);

    setTimeout(() => {
        console.log('\n✅ Datos de prueba cargados exitosamente');
        console.log('Puede acceder a la aplicación en http://localhost:3000\n');
        db.close();
    }, 4000);
}
