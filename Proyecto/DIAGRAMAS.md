# Diagramas de Arquitectura - SGV-APS

## 1. Diagrama de Componentes - Arquitectura de 3 Capas

```
╔════════════════════════════════════════════════════════════════════════════╗
║                    CLIENTE / SERVIDOR - 3 CAPAS                            ║
╚════════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                     CAPA 1: PRESENTACIÓN (FRONTEND)                         │
│                         /public                                             │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                          index.html                                  │  │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │  │
│  │  │  Inicio         │  │  Productos      │  │  Pedidos        │ ... │  │
│  │  │  (Bienvenida)   │  │  (Catálogo)     │  │  (Gestión)      │     │  │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘     │  │
│  │                                                                       │  │
│  │  ┌──────────────────────────────────────────────────────────────┐  │  │
│  │  │              Formularios y Tablas Dinámicas                 │  │  │
│  │  │              (HTML + CSS + JavaScript)                       │  │  │
│  │  └──────────────────────────────────────────────────────────────┘  │  │
│  │                                                                       │  │
│  │  ┌──────────────────────────────────────────────────────────────┐  │  │
│  │  │              app.js - Cliente Fetch API                      │  │  │
│  │  │  - Captura eventos del usuario                              │  │  │
│  │  │  - Realiza peticiones HTTP (GET, POST, PUT, DELETE)         │  │  │
│  │  │  - Actualiza el DOM con respuestas                          │  │  │
│  │  └──────────────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│                    ▼▼▼ HTTP/REST JSON ▼▼▼                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                CAPA 2: LÓGICA DE NEGOCIO (BACKEND)                         │
│                        /src/business                                        │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │              server.js - Expresss + Enrutamiento                     │  │
│  │  - app.get('/api/productos')                                         │  │
│  │  - app.post('/api/productos')                                        │  │
│  │  - app.put('/api/productos/:id')                                     │  │
│  │  - app.delete('/api/productos/:id')                                  │  │
│  │  - ... más rutas para pedidos, artesanas, eventos                   │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │          PresentationLayer.js - Controladores                        │  │
│  │                                                                       │  │
│  │  ProductoController        │ PedidoController                        │  │
│  │  ├─ obtenerProductos()     │ ├─ obtenerPedidos()                    │  │
│  │  ├─ crearProducto()        │ ├─ crearPedido()                       │  │
│  │  ├─ actualizarProducto()   │ ├─ actualizarEstadoPedido()            │  │
│  │  └─ eliminarProducto()     │ └─ obtenerEstadisticas()               │  │
│  │                            │                                         │  │
│  │  ArtesanaController        │ EventoController                        │  │
│  │  ├─ obtenerArtesanas()     │ ├─ obtenerEventos()                    │  │
│  │  └─ crearArtesana()        │ └─ crearEvento()                       │  │
│  │                                                                       │  │
│  │  Responsabilidades:                                                  │  │
│  │  - Recibir requests HTTP                                             │  │
│  │  - Parsear datos JSON                                                │  │
│  │  - Delegar a servicios de negocio                                    │  │
│  │  - Generar respuestas JSON                                           │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │          BusinessLayer.js - Servicios de Negocio                     │  │
│  │                                                                       │  │
│  │  ProductoService           │ PedidoService                           │  │
│  │  ├─ crear()                │ ├─ crear()                             │  │
│  │  ├─ obtenerTodos()         │ ├─ obtenerTodos()                      │  │
│  │  ├─ obtenerPorId()         │ ├─ actualizarEstado()                  │  │
│  │  ├─ actualizar()           │ └─ obtenerEstadisticas()               │  │
│  │  ├─ eliminar()             │                                         │  │
│  │  └─ obtenerPorTipo()       │ Validaciones:                           │  │
│  │                            │ - Monto > 0                             │  │
│  │  Validaciones:             │ - Cliente requerido                     │  │
│  │  - Precio > 0              │ - Formas de pago válidas                │  │
│  │  - Nombre requerido        │ - Estados válidos                       │  │
│  │  - Tipo requerido          │                                         │  │
│  │                            │                                         │  │
│  │  ArtesanaService           │ EventoService                           │  │
│  │  ├─ crear()                │ ├─ crear()                             │  │
│  │  └─ obtenerTodas()         │ └─ obtenerTodos()                      │  │
│  │                                                                       │  │
│  │  BusinessService (Orquestador Principal)                             │  │
│  │  - Instancia de todos los servicios                                  │  │
│  │  - Delega operaciones a servicios específicos                        │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│                    ▼▼▼ SQL / Promesas ▼▼▼                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    CAPA 3: DATOS (DATABASE)                                │
│                        /src/data                                            │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │          DatabaseLayer.js - Data Access Objects (DAO)               │  │
│  │                                                                       │  │
│  │  ProductoDAO               │ PedidoDAO                              │  │
│  │  ├─ crear()                │ ├─ crear()                             │  │
│  │  ├─ obtenerTodos()         │ ├─ obtenerTodos()                      │  │
│  │  ├─ obtenerPorId()         │ └─ actualizarEstado()                  │  │
│  │  ├─ actualizar()           │                                         │  │
│  │  └─ eliminar()             │ ArtesanaDAO                            │  │
│  │                            │ ├─ crear()                             │  │
│  │  Operaciones SQL:          │ └─ obtenerTodas()                      │  │
│  │  - INSERT INTO productos   │                                         │  │
│  │  - SELECT * FROM productos │ EventoDAO                              │  │
│  │  - UPDATE productos        │ ├─ crear()                             │  │
│  │  - DELETE FROM productos   │ └─ obtenerTodos()                      │  │
│  │                                                                       │  │
│  │  Responsabilidades:                                                  │  │
│  │  - Ejecutar operaciones CRUD                                         │  │
│  │  - Gestionar conexiones a BD                                         │  │
│  │  - Convertir resultados SQL a objetos JavaScript                    │  │
│  │  - NO implementar lógica de negocio                                  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                SQLite Database (/data/sgvaps.db)                     │  │
│  │                                                                       │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │  │
│  │  │  Tabla:      │  │  Tabla:      │  │  Tabla:      │              │  │
│  │  │  artesanas   │  │  productos   │  │  pedidos     │              │  │
│  │  │ ┌──────────┐ │  │ ┌──────────┐ │  │ ┌──────────┐ │              │  │
│  │  │ │ id (PK)  │ │  │ │ id (PK)  │ │  │ │ id (PK)  │ │              │  │
│  │  │ │ nombre   │ │  │ │ nombre   │ │  │ │ cliente  │ │              │  │
│  │  │ │ especialidad   │  │ │ tipo     │ │  │ │ email    │ │              │  │
│  │  │ │ telefono │ │  │ │ precio   │ │  │ │ estado   │ │              │  │
│  │  │ │ email    │ │  │ │ stock    │ │  │ │ monto    │ │              │  │
│  │  │ │ created_at   │  │ │ artesana_id (FK) │  │ forma_pago   │              │  │
│  │  │ └──────────┘ │  │ └──────────┘ │  │ │ fecha    │ │              │  │
│  │  └──────────────┘  └──────────────┘  │ └──────────┘ │              │  │
│  │                                        │              │              │  │
│  │                                        │ Tabla:       │              │  │
│  │                                        │ eventos      │              │  │
│  │                                        │ ┌──────────┐ │              │  │
│  │                                        │ │ id (PK)  │ │              │  │
│  │                                        │ │ nombre   │ │              │  │
│  │                                        │ │ descripción   │              │  │
│  │                                        │ │ fecha    │ │              │  │
│  │                                        │ │ ubicacion│ │              │  │
│  │                                        │ └──────────┘ │              │  │
│  │                                        └──────────────┘              │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Diagrama de Flujo - Crear Producto

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        USUARIO EN NAVEGADOR                             │
└────────────────┬────────────────────────────────────────────────────────┘
                 │
                 │ 1. Completa formulario y haz clic en "Crear Producto"
                 ▼
         ┌───────────────────────────┐
         │  Evento: submit en HTML   │
         │  app.js captura el evento │
         └────────────┬──────────────┘
                      │
                      │ 2. Lector datos del formulario
                      │    producto = {
                      │      nombre: "Collar",
                      │      tipo: "collar",
                      │      precio: 25.00,
                      │      ...
                      │    }
                      ▼
         ┌───────────────────────────────────────────┐
         │  fetch('POST /api/productos', {data})    │
         │  (CAPA DE PRESENTACIÓN - Cliente)        │
         └────────────┬────────────────────────────┘
                      │
                      │ 3. HTTP POST con JSON
                      │
                      ▼
         ┌─────────────────────────────────────────────────┐
         │  Express Router en server.js                    │
         │  POST /api/productos                            │
         │  (CAPA DE PRESENTACIÓN - Backend)              │
         └────────────┬────────────────────────────────────┘
                      │
                      │ 4. Crea ProductoController
                      │    Llama: crearProducto(req, res)
                      │
                      ▼
         ┌────────────────────────────────────────────────────┐
         │  ProductoController.crearProducto()               │
         │  - Extrae req.body (datos JSON)                   │
         │  - Llama: businessService.crearProducto(req.body) │
         │  (CAPA DE PRESENTACIÓN - Backend)               │
         └────────────┬─────────────────────────────────────┘
                      │
                      │ 5. Delegación a capa de negocio
                      │
                      ▼
         ┌──────────────────────────────────────────────────┐
         │  ProductoService.crear(producto)                │
         │  (CAPA DE LÓGICA DE NEGOCIO)                    │
         │                                                  │
         │  ✓ Validar datos:                               │
         │    - nombre requerido?                           │
         │    - tipo requerido?                             │
         │    - precio > 0?                                 │
         │                                                  │
         │  Si falla validación:                            │
         │    throw new Error("Datos inválidos")           │
         │                                                  │
         │  Si pasa validación:                             │
         │    Llama: productoDAO.crear(producto)           │
         └────────────┬─────────────────────────────────────┘
                      │
                      │ 6. Delegación a capa de datos
                      │
                      ▼
         ┌──────────────────────────────────────────────────┐
         │  ProductoDAO.crear(producto)                     │
         │  (CAPA DE DATOS)                                │
         │                                                  │
         │  const sql = `INSERT INTO productos (...)`       │
         │  db.run(sql, [nombre, tipo, precio, ...],       │
         │     function(err) {                              │
         │       if (err) reject(err)                       │
         │       else resolve(this.lastID)                  │
         │     }                                            │
         │  )                                               │
         └────────────┬─────────────────────────────────────┘
                      │
                      │ 7. Ejecución en SQLite
                      │
                      ▼
         ┌──────────────────────────────────────────────────┐
         │  SQLite - /data/sgvaps.db                        │
         │                                                  │
         │  INSERT INTO productos                          │
         │  (nombre, tipo, descripcion, materiales,        │
         │   precio, stock, artesana_id)                    │
         │  VALUES (?, ?, ?, ?, ?, ?, ?)                    │
         │                                                  │
         │  Resultado: lastID = 5                           │
         └────────────┬─────────────────────────────────────┘
                      │
                      │ 8. Retorna Promise con ID
                      │
                      ▼
         ┌──────────────────────────────────────────────────┐
         │  ProductoDAO: resolve(5)                         │
         │  ProductoService: resolve({id: 5, mensaje: ...})│
         │  ProductoController: res.status(201).json({...})│
         └────────────┬─────────────────────────────────────┘
                      │
                      │ 9. HTTP Response 201 Created
                      │    {
                      │      "exitoso": true,
                      │      "datos": {
                      │        "id": 5,
                      │        "mensaje": "Producto creado"
                      │      }
                      │    }
                      ▼
         ┌─────────────────────────────┐
         │  app.js recibe respuesta    │
         │  - Valida que exitoso=true  │
         │  - Actualiza el DOM         │
         │  - Muestra mensaje success  │
         │  - Recarga lista de productos
         └────────────┬────────────────┘
                      │
                      │ 10. Interfaz actualizada
                      │
                      ▼
         ┌──────────────────────────────────────┐
         │  Usuario ve nuevo producto en lista  │
         │  "Collar | collar | $25.00 | ..."  │
         └──────────────────────────────────────┘
```

---

## 3. Relación entre Componentes

```
┌──────────────────────────────────────────────────────────────────────┐
│                         FLUJO DE DATOS                               │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Cliente Frontend                 Servidor Backend                  │
│  ─────────────────                 ────────────                    │
│                                                                      │
│  index.html ◄─────HTML─────► PresentationLayer                     │
│       ▲                            ▲                                │
│       │                            │                                │
│       │ JSON (HTTP)                │ JSON (HTTP Response)           │
│       │                            │                                │
│   app.js ◄──────────────────────┼─────► Express Router            │
│       │                            │         ▲                      │
│       │                            │         │                      │
│       │                            │   ProductoController           │
│       │                            │   PedidoController             │
│       │                            │   ArtesanaController           │
│       │                            │   EventoController             │
│       │                            │         ▲                      │
│       │                            │         │                      │
│       │                            │    Service Calls               │
│       │                            │         ▲                      │
│       │                            │         │                      │
│       │                            └─────► BusinessService          │
│       │                                     ▲                       │
│       │                                     │                       │
│       │                                  ProductoService            │
│       │                                  PedidoService              │
│       │                                  ArtesanaService            │
│       │                                  EventoService              │
│       │                                     ▲                       │
│       │                                     │                       │
│       │                                   DAO Calls                 │
│       │                                     ▲                       │
│       │                                     │                       │
│       │                                  ProductoDAO                │
│       │                                  PedidoDAO                  │
│       │                                  ArtesanaDAO                │
│       │                                  EventoDAO                  │
│       │                                     ▲                       │
│       │                                     │                       │
│       │                                   SQL Queries               │
│       │                                     ▲                       │
│       │                                     │                       │
│       │                                  SQLite Database            │
│       │                                  sgvaps.db                  │
│       │                                                              │
└──────┴──────────────────────────────────────────────────────────────┘

Separación Estricta:
- El cliente NO puede acceder a la BD
- La BD NO puede responder directamente al cliente
- Cada capa solo comunica con la siguiente
- Las validaciones ocurren en Negocio, no en Presentación o Datos
```

---

## 4. Componentes Base (Mínimo 3)

```
COMPONENTE 1: ProductoService + ProductoDAO + ProductoController
├─ Gestiona: Productos artesanales
├─ Operaciones: CRUD completo
└─ Validaciones: Precio > 0, nombre/tipo requeridos

COMPONENTE 2: PedidoService + PedidoDAO + PedidoController
├─ Gestiona: Pedidos y ventas
├─ Operaciones: Crear, listar, cambiar estado
└─ Validaciones: Monto > 0, estados válidos

COMPONENTE 3: ArtesanaService + ArtesanaDAO + ArtesanaController
├─ Gestiona: Registro de artesanas
├─ Operaciones: Crear, listar
└─ Validaciones: Nombre/especialidad requeridos

COMPONENTE ADICIONAL: EventoService + EventoDAO + EventoController
├─ Gestiona: Eventos y ferias
├─ Operaciones: Crear, listar
└─ Validaciones: Nombre/fecha requeridos
```

---

## 5. Matriz de Responsabilidades

```
┌────────────────────┬─────────────────┬─────────────────┬──────────────────┐
│ Actividad          │ Presentación    │ Negocio         │ Datos            │
├────────────────────┼─────────────────┼─────────────────┼──────────────────┤
│ Recibir HTTP       │       ✓         │                 │                  │
│ Validar formato    │       ✓         │                 │                  │
│ Validar negocio    │                 │       ✓         │                  │
│ Generar respuesta  │       ✓         │                 │                  │
│ Ejecutar SQL       │                 │                 │       ✓          │
│ Acceder BD         │                 │                 │       ✓          │
│ Lógica reglas      │                 │       ✓         │                  │
│ Hacer fetch()      │       ✓         │                 │                  │
│ Actualizar DOM     │       ✓         │                 │                  │
│ Manejo promesas    │       ✓         │       ✓         │       ✓          │
└────────────────────┴─────────────────┴─────────────────┴──────────────────┘
```
