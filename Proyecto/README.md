# 🏺 Sistema de Gestión y Venta de Artesanías de Saraguro (SGV-APS)

## Descripción del Proyecto

Sistema web integral para la comercialización y gestión de artesanías tradicionales del pueblo Saraguro. Implementa una arquitectura cliente/servidor de 3 capas en un único nodo, garantizando separación clara entre las capas de presentación, lógica de negocio y datos.

## Características Principales

- **📦 Gestión de Productos**: Registro y administración de artesanías (collares, aretes, manillas, carteras, etc.)
- **🛒 Gestión de Pedidos**: Control de pedidos con estados (pendiente, enviado, entregado, cancelado)
- **👩‍🦱 Registro de Artesanas**: Administración de artesanas y sus especialidades
- **🎉 Eventos y Ferias**: Promoción de eventos locales y productos destacados
- **📊 Estadísticas**: Análisis de pedidos y ventas

## Arquitectura del Sistema

### Arquitectura de 3 Capas

El sistema implementa una arquitectura cliente/servidor de 3 capas con separación estrictamente lógica:

```
┌─────────────────────────────────────────────────────────┐
│           CAPA DE PRESENTACIÓN (Frontend)                │
│  - HTML/CSS/JavaScript                                   │
│  - Interfaz de usuario                                   │
│  - Cliente HTTP                                          │
└────────────────┬────────────────────────────────────────┘
                 │ API REST
┌────────────────▼────────────────────────────────────────┐
│      CAPA DE LÓGICA DE NEGOCIO (Backend)                │
│  - Node.js/Express                                       │
│  - Reglas de negocio                                     │
│  - Validaciones                                          │
│  - Controladores                                         │
└────────────────┬────────────────────────────────────────┘
                 │ SQL
┌────────────────▼────────────────────────────────────────┐
│        CAPA DE DATOS (Database)                         │
│  - SQLite                                                │
│  - Persistencia de datos                                │
│  - Data Access Objects (DAO)                            │
└─────────────────────────────────────────────────────────┘
```

### Componentes Base

El sistema incluye **mínimo 3 componentes bases**:

1. **ProductoDAO/ProductoService/ProductoController**: Gestión de productos artesanales
2. **PedidoDAO/PedidoService/PedidoController**: Gestión de pedidos y ventas
3. **ArtesanaDAO/ArtesanaService/ArtesanaController**: Gestión de artesanas
4. **EventoDAO/EventoService/EventoController**: Gestión de eventos y ferias

Cada componente implementa la separación de capas de forma consistente.

## Estructura de Archivos

```
proyecto/
├── public/                          # Capa de Presentación (Frontend)
│   ├── index.html                   # Página principal
│   ├── css/
│   │   └── styles.css               # Estilos de la aplicación
│   └── js/
│       └── app.js                   # Lógica del cliente
├── src/
│   ├── presentation/                # Capa de Presentación (Backend)
│   │   └── PresentationLayer.js     # Controladores HTTP
│   ├── business/                    # Capa de Lógica de Negocio
│   │   └── BusinessLayer.js         # Servicios de negocio
│   └── data/                        # Capa de Datos
│       └── DatabaseLayer.js         # DAOs y acceso a BD
├── data/
│   └── sgvaps.db                    # Base de datos SQLite
├── server.js                        # Servidor Express principal
└── package.json                     # Dependencias del proyecto
```

## Instalación

### Requisitos
- Node.js (versión 14 o superior)
- npm

### Pasos de Instalación

1. **Navegar al directorio del proyecto**:
   ```bash
   cd ruta/al/proyecto
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor**:
   ```bash
   npm start
   ```

4. **Acceder a la aplicación**:
   - Abrir navegador en: `http://localhost:3000`

## Uso de la Aplicación

### Gestión de Productos
- **Crear Producto**: Completar formulario con detalles del producto y hacer clic en "Crear Producto"
- **Ver Productos**: Los productos se muestran en cards con información completa
- **Editar/Eliminar**: Botones disponibles en cada card

### Gestión de Pedidos
- **Registrar Pedido**: Ingresar datos del cliente y monto total
- **Cambiar Estado**: Dropdown para actualizar estado (pendiente → enviado → entregado)
- **Estadísticas**: Se actualizan automáticamente al registrar o modificar pedidos

### Registro de Artesanas
- **Registrar Artesana**: Incluir especialidad y contacto
- **Asociar Productos**: Al crear productos, vincular a artesana mediante su ID

### Eventos y Ferias
- **Crear Evento**: Ingresar fecha, ubicación y descripción
- **Promoter**: Eventos aparecen en la sección de Eventos

## API REST Disponible

### Productos
- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:id` - Obtener producto específico
- `POST /api/productos` - Crear nuevo producto
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto

### Pedidos
- `GET /api/pedidos` - Obtener todos los pedidos
- `POST /api/pedidos` - Crear nuevo pedido
- `PUT /api/pedidos/:id/estado` - Actualizar estado del pedido

### Artesanas
- `GET /api/artesanas` - Obtener todas las artesanas
- `POST /api/artesanas` - Registrar nueva artesana

### Eventos
- `GET /api/eventos` - Obtener todos los eventos
- `POST /api/eventos` - Crear nuevo evento

## Separación de Responsabilidades

### Capa de Presentación (PresentationLayer.js)
- Controladores HTTP que manejan peticiones y respuestas
- No contiene lógica de negocio
- Solo formatea y valida requests/responses

### Capa de Lógica de Negocio (BusinessLayer.js)
- Servicios que implementan reglas de negocio
- Validaciones específicas del dominio
- No accede directamente a la base de datos

### Capa de Datos (DatabaseLayer.js)
- Data Access Objects (DAO)
- Operaciones CRUD
- Gestión de conexiones a SQLite
- No contiene lógica de negocio

## Base de Datos

### Tablas Principales

**artesanas**
```sql
CREATE TABLE artesanas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  especialidad TEXT NOT NULL,
  telefono TEXT,
  email TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

**productos**
```sql
CREATE TABLE productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  tipo TEXT NOT NULL,
  descripcion TEXT,
  materiales TEXT,
  precio REAL NOT NULL,
  stock INTEGER DEFAULT 0,
  artesana_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(artesana_id) REFERENCES artesanas(id)
)
```

**pedidos**
```sql
CREATE TABLE pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_nombre TEXT NOT NULL,
  cliente_email TEXT,
  estado TEXT DEFAULT 'pendiente',
  monto_total REAL NOT NULL,
  forma_pago TEXT,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

**eventos**
```sql
CREATE TABLE eventos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  fecha DATE NOT NULL,
  ubicacion TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Flujo de Datos

1. **Cliente (Frontend)**: Usuario interactúa con la interfaz HTML
2. **HTTP Request**: JavaScript envía petición GET/POST/PUT/DELETE a `http://localhost:3000/api/*`
3. **Presentation Layer**: Express recibe la petición y la delega al controlador apropiado
4. **Business Layer**: El servicio valida datos y aplica reglas de negocio
5. **Data Layer**: El DAO ejecuta operaciones en SQLite
6. **HTTP Response**: Respuesta JSON regresa al cliente
7. **Frontend Update**: JavaScript actualiza la interfaz con los datos

## Validaciones de Negocio

- **Productos**: Precio > 0, nombre y tipo requeridos
- **Pedidos**: Monto > 0, cliente requerido, forma de pago válida
- **Artesanas**: Nombre y especialidad requeridos
- **Eventos**: Nombre y fecha requeridos

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Backend**: Node.js, Express.js
- **Base de Datos**: SQLite3
- **Arquitectura**: Cliente/Servidor de 3 Capas

## Seguridad Considerada

- Validación de datos en capa de negocio
- Uso de CORS para manejo de solicitudes
- Consultas preparadas con SQLite
- Manejo de errores centralizado

## Próximas Mejoras

- Autenticación y autorización de usuarios
- Panel de administración avanzado
- Reportes de ventas más detallados
- Integración con gateway de pagos
- Sistema de notificaciones por correo
- Galería de imágenes de productos

## Contacto y Soporte

Para reportar bugs o sugerencias, contactar a los desarrolladores del proyecto.

---

**Desarrollado siguiendo estándares de arquitectura de software de 3 capas**
**Última actualización: 2025**
