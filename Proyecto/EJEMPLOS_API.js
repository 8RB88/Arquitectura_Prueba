// =============================================
// EJEMPLOS DE USO - API REST SGV-APS
// =============================================

// Estos ejemplos muestran cómo interactuar con la API REST
// Ejecutar desde el navegador o Postman

// ============ PRODUCTOS ============

// 1. Obtener todos los productos
fetch('http://localhost:3000/api/productos')
  .then(res => res.json())
  .then(data => console.log(data));

// Respuesta esperada:
{
  "exitoso": true,
  "datos": [
    {
      "id": 1,
      "nombre": "Collar Tradicional",
      "tipo": "collar",
      "descripcion": "Collar con diseño tradicional",
      "materiales": "cuentas de vidrio, hilo",
      "precio": 25.0,
      "stock": 10,
      "artesana_id": 1,
      "artesana_nombre": "María Quichimbo"
    }
  ],
  "cantidad": 1
}

// ============================================

// 2. Obtener un producto específico
fetch('http://localhost:3000/api/productos/1')
  .then(res => res.json())
  .then(data => console.log(data));

// ============================================

// 3. Crear un nuevo producto
const nuevoProducto = {
  nombre: "Aretes de Plata",
  tipo: "arete",
  descripcion: "Aretes con acabados de plata",
  materiales: "plata, cristal",
  precio: 15.00,
  stock: 20,
  artesana_id: 1
};

fetch('http://localhost:3000/api/productos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(nuevoProducto)
})
  .then(res => res.json())
  .then(data => console.log(data));

// Respuesta esperada:
{
  "exitoso": true,
  "datos": {
    "id": 5,
    "mensaje": "Producto creado exitosamente"
  }
}

// ============================================

// 4. Actualizar un producto
const productoActualizado = {
  nombre: "Collar Moderno",
  tipo: "collar",
  descripcion: "Collar con diseño moderno y tradicional",
  materiales: "cuentas de vidrio, plata",
  precio: 30.00,
  stock: 12,
  artesana_id: 1
};

fetch('http://localhost:3000/api/productos/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(productoActualizado)
})
  .then(res => res.json())
  .then(data => console.log(data));

// Respuesta esperada:
{
  "exitoso": true,
  "datos": {
    "mensaje": "Producto actualizado exitosamente"
  }
}

// ============================================

// 5. Eliminar un producto
fetch('http://localhost:3000/api/productos/1', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data));

// Respuesta esperada:
{
  "exitoso": true,
  "datos": {
    "mensaje": "Producto eliminado exitosamente"
  }
}

// ============ PEDIDOS ============

// 6. Obtener todos los pedidos
fetch('http://localhost:3000/api/pedidos')
  .then(res => res.json())
  .then(data => console.log(data));

// Respuesta esperada:
{
  "exitoso": true,
  "datos": [
    {
      "id": 1,
      "cliente_nombre": "Juan García",
      "cliente_email": "juan@example.com",
      "estado": "entregado",
      "monto_total": 85.0,
      "forma_pago": "efectivo",
      "fecha": "2025-01-08T15:30:00.000Z"
    }
  ],
  "cantidad": 1
}

// ============================================

// 7. Crear un nuevo pedido
const nuevoPedido = {
  cliente_nombre: "Ana Martínez",
  cliente_email: "ana@example.com",
  monto_total: 42.00,
  forma_pago: "transferencia",
  estado: "pendiente"
};

fetch('http://localhost:3000/api/pedidos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(nuevoPedido)
})
  .then(res => res.json())
  .then(data => console.log(data));

// Respuesta esperada:
{
  "exitoso": true,
  "datos": {
    "id": 4,
    "estado": "pendiente",
    "mensaje": "Pedido registrado exitosamente"
  }
}

// ============================================

// 8. Cambiar estado de un pedido
const cambioEstado = {
  estado: "enviado"
};

fetch('http://localhost:3000/api/pedidos/1/estado', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(cambioEstado)
})
  .then(res => res.json())
  .then(data => console.log(data));

// Respuesta esperada:
{
  "exitoso": true,
  "datos": {
    "mensaje": "Pedido actualizado a estado: enviado"
  }
}

// ============ ARTESANAS ============

// 9. Obtener todas las artesanas
fetch('http://localhost:3000/api/artesanas')
  .then(res => res.json())
  .then(data => console.log(data));

// Respuesta esperada:
{
  "exitoso": true,
  "datos": [
    {
      "id": 1,
      "nombre": "María Quichimbo",
      "especialidad": "bisutería",
      "telefono": "0987654321",
      "email": "maria@saraguro.com",
      "created_at": "2025-01-08T15:25:00.000Z"
    }
  ],
  "cantidad": 1
}

// ============================================

// 10. Registrar una nueva artesana
const nuevaArtesana = {
  nombre: "Rosa Pachacuti",
  especialidad: "textiles",
  telefono: "0987654322",
  email: "rosa@saraguro.com"
};

fetch('http://localhost:3000/api/artesanas', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(nuevaArtesana)
})
  .then(res => res.json())
  .then(data => console.log(data));

// Respuesta esperada:
{
  "exitoso": true,
  "datos": {
    "id": 4,
    "mensaje": "Artesana registrada exitosamente"
  }
}

// ============ EVENTOS ============

// 11. Obtener todos los eventos
fetch('http://localhost:3000/api/eventos')
  .then(res => res.json())
  .then(data => console.log(data));

// Respuesta esperada:
{
  "exitoso": true,
  "datos": [
    {
      "id": 1,
      "nombre": "Feria de Artesanías de Saraguro",
      "descripcion": "Exposición y venta de productos artesanales",
      "fecha": "2025-03-01",
      "ubicacion": "Plaza Central de Saraguro",
      "created_at": "2025-01-08T15:25:00.000Z"
    }
  ],
  "cantidad": 1
}

// ============================================

// 12. Crear un nuevo evento
const nuevoEvento = {
  nombre: "Taller de Bisutería Tradicional",
  descripcion: "Capacitación en técnicas tradicionales",
  fecha: "2025-02-15",
  ubicacion: "Centro Comunitario"
};

fetch('http://localhost:3000/api/eventos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(nuevoEvento)
})
  .then(res => res.json())
  .then(data => console.log(data));

// Respuesta esperada:
{
  "exitoso": true,
  "datos": {
    "id": 4,
    "mensaje": "Evento registrado exitosamente"
  }
}

// ============ MANEJO DE ERRORES ============

// 13. Crear producto con datos inválidos (error)
const productoInvalido = {
  nombre: "Collar",
  tipo: "collar",
  precio: -10 // ❌ Precio negativo
};

fetch('http://localhost:3000/api/productos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(productoInvalido)
})
  .then(res => res.json())
  .then(data => console.log(data));

// Respuesta esperada (ERROR):
{
  "exitoso": false,
  "error": "Datos de producto inválidos"
}

// ============================================

// 14. Obtener producto inexistente (error)
fetch('http://localhost:3000/api/productos/999')
  .then(res => res.json())
  .then(data => console.log(data));

// Respuesta esperada (ERROR):
{
  "exitoso": false,
  "error": "Producto no encontrado"
}

// ============================================

// 15. Cambiar a estado inválido (error)
const estadoInvalido = {
  estado: "incorrecto" // ❌ Estado no válido
};

fetch('http://localhost:3000/api/pedidos/1/estado', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(estadoInvalido)
})
  .then(res => res.json())
  .then(data => console.log(data));

// Respuesta esperada (ERROR):
{
  "exitoso": false,
  "error": "Estado no válido. Estados permitidos: pendiente, enviado, entregado, cancelado"
}

// ============ USANDO ASYNC/AWAIT ============

// Ejemplo con async/await (más legible)
async function crearProductoAsync() {
  try {
    const nuevoProducto = {
      nombre: "Manilla Tejida",
      tipo: "manilla",
      descripcion: "Manilla hecha a mano",
      materiales: "lana de colores",
      precio: 12.00,
      stock: 15,
      artesana_id: 2
    };

    const response = await fetch('http://localhost:3000/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto)
    });

    const data = await response.json();
    
    if (data.exitoso) {
      console.log('✓ Producto creado:', data.datos);
    } else {
      console.error('✗ Error:', data.error);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

// Llamar la función
crearProductoAsync();

// ============================================

// RESUMEN DE CÓDIGOS HTTP ESPERADOS

/*
✓ 200 OK - GET exitoso
✓ 201 Created - POST exitoso
✓ 204 No Content - DELETE/PUT exitoso
✗ 400 Bad Request - Datos inválidos
✗ 404 Not Found - Recurso no encontrado
✗ 500 Internal Server Error - Error del servidor
*/

// ============================================

// VALIDACIONES DEL SISTEMA

/*
PRODUCTOS:
- Precio debe ser > 0
- Nombre es requerido
- Tipo es requerido
- Tipos válidos: collar, arete, manilla, cartera, otro

PEDIDOS:
- Monto debe ser > 0
- Cliente es requerido
- Formas de pago válidas: efectivo, transferencia, tarjeta
- Estados válidos: pendiente, enviado, entregado, cancelado

ARTESANAS:
- Nombre es requerido
- Especialidad es requerida
- Especialidades sugeridas: bisutería, textiles, cerámica, cuero

EVENTOS:
- Nombre es requerido
- Fecha es requerida
- Formato de fecha: YYYY-MM-DD
*/

// ============================================

// PRUEBA RÁPIDA EN CONSOLA DEL NAVEGADOR

/*
1. Abre http://localhost:3000
2. Presiona F12 para abrir la consola
3. Copia y pega los ejemplos anteriores
4. Presiona Enter para ejecutar
5. Verás los resultados en la consola

Ejemplo rápido:
fetch('http://localhost:3000/api/productos')
  .then(r => r.json())
  .then(d => console.table(d.datos))
*/
