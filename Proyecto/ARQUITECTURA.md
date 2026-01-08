# Documentación Técnica - SGV-APS

## 1. Arquitectura de 3 Capas

El sistema implementa una arquitectura cliente/servidor de 3 capas con **separación lógica estricta**:

### Capa 1: Presentación (Frontend)
**Ubicación**: `/public`
- Archivo: `index.html` - Estructura HTML
- Archivo: `css/styles.css` - Estilos CSS3
- Archivo: `js/app.js` - Lógica del cliente (Fetch API)

**Responsabilidades**:
- Mostrar interfaz de usuario
- Capturar eventos del usuario
- Realizar peticiones HTTP a la API
- Mostrar respuestas en la interfaz

**Tecnologías**: HTML5, CSS3, JavaScript Vanilla, Fetch API

---

### Capa 2: Lógica de Negocio (Backend)
**Ubicación**: `/src/business`
- Archivo: `BusinessLayer.js`

**Componentes**:
1. `ProductoService` - Reglas de negocio para productos
2. `PedidoService` - Reglas de negocio para pedidos
3. `ArtesanaService` - Reglas de negocio para artesanas
4. `EventoService` - Reglas de negocio para eventos
5. `BusinessService` - Orquestador principal

**Responsabilidades**:
- Validar datos de entrada
- Aplicar reglas de negocio
- Coordinar operaciones
- Generar errores y excepciones
- NO accede directamente a la base de datos

**Validaciones Implementadas**:
```javascript
// Ejemplo de ProductoService
- Precio > 0
- Nombre requerido
- Tipo requerido

// Ejemplo de PedidoService
- Monto > 0
- Cliente requerido
- Forma de pago válida (efectivo, transferencia, tarjeta)
- Estados válidos (pendiente, enviado, entregado, cancelado)

// Ejemplo de ArtesanaService
- Nombre requerido
- Especialidad requerida

// Ejemplo de EventoService
- Nombre requerido
- Fecha requerida
```

**Tecnologías**: Node.js, JavaScript

---

### Capa 3: Datos (Database)
**Ubicación**: `/src/data`
- Archivo: `DatabaseLayer.js`
- Base de datos: `/data/sgvaps.db` (SQLite)

**Componentes (Data Access Objects)**:
1. `ProductoDAO` - Acceso a productos
2. `PedidoDAO` - Acceso a pedidos
3. `ArtesanaDAO` - Acceso a artesanas
4. `EventoDAO` - Acceso a eventos

**Responsabilidades**:
- Operaciones CRUD
- Transacciones SQL
- Gestión de conexiones
- NO contiene lógica de negocio
- Promesas para operaciones asincrónicas

**Operaciones Disponibles**:
```javascript
// ProductoDAO
- crear(producto)
- obtenerTodos()
- obtenerPorId(id)
- actualizar(id, producto)
- eliminar(id)

// PedidoDAO
- crear(pedido)
- obtenerTodos()
- actualizarEstado(id, estado)

// ArtesanaDAO
- crear(artesana)
- obtenerTodas()

// EventoDAO
- crear(evento)
- obtenerTodos()
```

**Tecnologías**: SQLite3, Node.js

---

## 2. Flujo de Comunicación

```
┌─────────────────────┐
│   Cliente (HTML)    │
└──────────┬──────────┘
           │ 1. User Click
           ▼
┌─────────────────────┐
│   app.js (JS)       │ Fetch() → http://localhost:3000/api/*
└──────────┬──────────┘
           │ 2. HTTP Request (JSON)
           ▼
┌─────────────────────────────────────────────┐
│        server.js (Express)                  │
│   app.post('/api/productos', (req, res))    │
│   → PresentationController                  │
└──────────┬──────────────────────────────────┘
           │ 3. Delegación
           ▼
┌─────────────────────────────────────────────┐
│     ProductoController                      │
│   crearProducto(req, res)                   │
│   → businessService.crearProducto()         │
└──────────┬──────────────────────────────────┘
           │ 4. Llamada a Servicio
           ▼
┌─────────────────────────────────────────────┐
│     ProductoService                         │
│   crear(producto)                           │
│   → Validar datos                           │
│   → productoDAO.crear()                     │
└──────────┬──────────────────────────────────┘
           │ 5. Operación en BD
           ▼
┌─────────────────────────────────────────────┐
│     ProductoDAO                             │
│   crear(producto)                           │
│   → INSERT INTO productos                   │
│   → sgvaps.db                               │
└──────────┬──────────────────────────────────┘
           │ 6. Resultado
           ▼
┌─────────────────────────────────────────────┐
│     Respuesta (Promise)                     │
│   { exitoso: true, datos: {...} }          │
│   ← regresa por todas las capas             │
└──────────┬──────────────────────────────────┘
           │ 7. HTTP Response (JSON)
           ▼
┌─────────────────────┐
│   Navegador         │
│   Actualiza DOM     │
└─────────────────────┘
```

---

## 3. Estructura de Carpetas

```
proyecto/
├── 📁 public/                    # Capa de Presentación (Frontend)
│   ├── index.html               # Página principal
│   ├── 📁 css/
│   │   └── styles.css           # Estilos
│   └── 📁 js/
│       └── app.js               # Cliente JavaScript
│
├── 📁 src/                       # Código fuente del servidor
│   ├── 📁 presentation/          # Capa de Presentación (Backend)
│   │   └── PresentationLayer.js  # Controladores HTTP
│   │
│   ├── 📁 business/              # Capa de Lógica de Negocio
│   │   └── BusinessLayer.js      # Servicios de negocio
│   │
│   └── 📁 data/                  # Capa de Datos
│       └── DatabaseLayer.js      # DAOs
│
├── 📁 data/                      # Almacenamiento de datos
│   └── sgvaps.db                # Base de datos SQLite
│
├── 📁 config/                    # Configuración
│
├── server.js                     # Punto de entrada (Express)
├── package.json                  # Dependencias
├── test-data.js                  # Script de datos de prueba
└── README.md                     # Documentación
```

---

## 4. Patrones de Diseño Utilizados

### 4.1 Patrón MVC (Modelo-Vista-Controlador)
- **Vista**: HTML/CSS/JavaScript del cliente
- **Modelo**: Clases DAO (ProductoDAO, etc.)
- **Controlador**: Clases Controller (ProductoController, etc.)

### 4.2 Patrón DAO (Data Access Object)
- Abstrae el acceso a la base de datos
- Encapsula la lógica SQL
- Facilita testing y cambios de BD

### 4.3 Patrón Servicio (Service Layer)
- Contiene lógica de negocio
- Valida datos antes de persistir
- Coordina múltiples operaciones

### 4.4 Patrón Controlador (Controller)
- Maneja peticiones HTTP
- Delega a servicios
- Genera respuestas JSON

### 4.5 Patrón Singleton
- Una única instancia del servicio de negocio
- Compartida entre todos los controladores

---

## 5. Base de Datos - Esquema

### Tabla: artesanas
```sql
CREATE TABLE artesanas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    especialidad TEXT NOT NULL,
    telefono TEXT,
    email TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: productos
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
);
```

### Tabla: pedidos
```sql
CREATE TABLE pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_nombre TEXT NOT NULL,
    cliente_email TEXT,
    estado TEXT DEFAULT 'pendiente',
    monto_total REAL NOT NULL,
    forma_pago TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: eventos
```sql
CREATE TABLE eventos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    ubicacion TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6. API REST Endpoints

### Productos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Obtener todos |
| GET | `/api/productos/:id` | Obtener por ID |
| POST | `/api/productos` | Crear nuevo |
| PUT | `/api/productos/:id` | Actualizar |
| DELETE | `/api/productos/:id` | Eliminar |

### Pedidos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/pedidos` | Obtener todos |
| POST | `/api/pedidos` | Crear nuevo |
| PUT | `/api/pedidos/:id/estado` | Cambiar estado |

### Artesanas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/artesanas` | Obtener todas |
| POST | `/api/artesanas` | Registrar nueva |

### Eventos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/eventos` | Obtener todos |
| POST | `/api/eventos` | Crear nuevo |

---

## 7. Ejemplo de Flujo Completo

### Crear un Producto

**1. Cliente (Frontend)**
```javascript
// app.js
const producto = {
    nombre: "Collar Tradicional",
    tipo: "collar",
    descripcion: "Collar con diseño de Saraguro",
    materiales: "cuentas de vidrio",
    precio: 25.00,
    stock: 10,
    artesana_id: 1
};

fetch('http://localhost:3000/api/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
})
```

**2. Servidor - Presentación**
```javascript
// PresentationLayer.js
async crearProducto(req, res) {
    try {
        const resultado = await this.businessService.crearProducto(req.body);
        res.status(201).json({ exitoso: true, datos: resultado });
    } catch (error) {
        res.status(400).json({ exitoso: false, error: error.message });
    }
}
```

**3. Servidor - Lógica de Negocio**
```javascript
// BusinessLayer.js
async crear(producto) {
    // Validar
    if (!producto.nombre || !producto.tipo || producto.precio <= 0) {
        throw new Error('Datos de producto inválidos');
    }
    
    // Crear
    const id = await this.productoDAO.crear(producto);
    return { id, mensaje: 'Producto creado exitosamente' };
}
```

**4. Servidor - Datos**
```javascript
// DatabaseLayer.js
crear(producto) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO productos (nombre, tipo, descripcion, materiales, precio, stock, artesana_id) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        this.db.run(sql, [...], function (err) {
            if (err) reject(err);
            else resolve(this.lastID);
        });
    });
}
```

**5. Respuesta**
```json
{
    "exitoso": true,
    "datos": {
        "id": 1,
        "mensaje": "Producto creado exitosamente"
    }
}
```

---

## 8. Instalación y Ejecución

### Requisitos
- Node.js v14+
- npm

### Pasos
1. `npm install` - Instalar dependencias
2. `npm start` - Iniciar servidor (puerto 3000)
3. Abrir: `http://localhost:3000`
4. (Opcional) `node test-data.js` - Cargar datos de prueba

---

## 9. Consideraciones de Seguridad

- ✓ Validación de entrada en capa de negocio
- ✓ Consultas preparadas (sqlite3)
- ✓ Manejo de errores centralizado
- ✓ CORS habilitado
- ✓ Promesas para evitar callbacks
- ⚠️ Por implementar: Autenticación
- ⚠️ Por implementar: Encriptación de passwords
- ⚠️ Por implementar: Rate limiting

---

## 10. Extensión del Sistema

### Agregar Nueva Entidad (ej: Categorías)

1. **Crear tabla en DatabaseLayer.js**
   ```javascript
   db.run(`CREATE TABLE IF NOT EXISTS categorias (...)`);
   ```

2. **Crear DAO**
   ```javascript
   class CategoriaDAO { ... }
   ```

3. **Crear Servicio**
   ```javascript
   class CategoriaService { ... }
   ```

4. **Crear Controlador**
   ```javascript
   class CategoriaController { ... }
   ```

5. **Agregar rutas en server.js**
   ```javascript
   app.get('/api/categorias', (req, res) => { ... });
   ```

---

## Conclusión

El sistema SGV-APS implementa una arquitectura cliente/servidor de **3 capas con separación lógica estricta**, garantizando:

- ✅ Mantenibilidad
- ✅ Escalabilidad
- ✅ Testabilidad
- ✅ Separación de responsabilidades
- ✅ Reutilización de código
- ✅ Fácil debugging
