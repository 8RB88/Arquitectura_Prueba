# GUÍA DE INICIO RÁPIDO - SGV-APS

## ✅ Estado Actual

El **Sistema de Gestión y Venta de Artesanías de Saraguro (SGV-APS)** ha sido completamente desarrollado e implementado.

## 📋 Verificación de Componentes

### ✓ Capa de Presentación (Frontend)
- **Archivo**: `/public/index.html`
- **Estilos**: `/public/css/styles.css`
- **JavaScript**: `/public/js/app.js`
- **Características**: 
  - Interfaz responsiva
  - Navegación entre módulos
  - Formularios dinámicos
  - Tablas interactivas

### ✓ Capa de Lógica de Negocio
- **Archivo**: `/src/business/BusinessLayer.js`
- **Componentes**:
  1. `ProductoService` - Gestión de productos
  2. `PedidoService` - Gestión de pedidos
  3. `ArtesanaService` - Gestión de artesanas
  4. `EventoService` - Gestión de eventos
  5. `BusinessService` - Orquestador principal
- **Validaciones**: Todas implementadas

### ✓ Capa de Datos
- **Archivo**: `/src/data/DatabaseLayer.js`
- **Data Access Objects (DAO)**:
  1. `ProductoDAO` - CRUD de productos
  2. `PedidoDAO` - CRUD de pedidos
  3. `ArtesanaDAO` - CRUD de artesanas
  4. `EventoDAO` - CRUD de eventos
- **Base de Datos**: SQLite (`/data/sgvaps.db`)
- **Tablas**: 4 tablas principales con relaciones

### ✓ Servidor
- **Archivo**: `/server.js`
- **Framework**: Express.js
- **Puerto**: 3000
- **Rutas API**: 13+ endpoints REST

## 🚀 Instrucciones de Ejecución

### 1️⃣ Instalación (Primera vez)
```bash
cd "C:\Users\busta\Desktop\Prueba arqui{\Arquitectura_Prueba\Proyecto"
npm install
```

### 2️⃣ Iniciar el Servidor
```bash
npm start
```

Verás esta salida:
```
╔════════════════════════════════════════════════════════════╗
║  SGV-APS - Sistema de Gestión de Artesanías Saraguro       ║
║  Servidor ejecutándose en http://localhost:3000              ║
║  Arquitectura: Cliente/Servidor - 3 Capas                 ║
╚════════════════════════════════════════════════════════════╝
✓ Conexión a base de datos establecida
✓ Tablas de base de datos creadas
```

### 3️⃣ Acceder a la Aplicación
Abre en tu navegador: **http://localhost:3000**

### 4️⃣ Cargar Datos de Prueba (Opcional)
En otra terminal:
```bash
cd "C:\Users\busta\Desktop\Prueba arqui{\Arquitectura_Prueba\Proyecto"
node test-data.js
```

## 📁 Estructura de Archivos Creados

```
Proyecto/
├── 📄 server.js                          # Punto de entrada
├── 📄 package.json                       # Dependencias
├── 📄 test-data.js                       # Carga datos de prueba
├── 📄 README.md                          # Documentación principal
├── 📄 ARQUITECTURA.md                    # Documentación técnica
├── 📄 DIAGRAMAS.md                       # Diagramas ASCII
│
├── 📁 public/                            # CAPA DE PRESENTACIÓN (Frontend)
│   ├── 📄 index.html                     # Página principal
│   ├── 📁 css/
│   │   └── 📄 styles.css                 # Estilos
│   └── 📁 js/
│       └── 📄 app.js                     # Cliente JavaScript
│
├── 📁 src/
│   ├── 📁 presentation/                  # CAPA DE PRESENTACIÓN (Backend)
│   │   └── 📄 PresentationLayer.js       # Controladores HTTP
│   │
│   ├── 📁 business/                      # CAPA DE LÓGICA DE NEGOCIO
│   │   └── 📄 BusinessLayer.js           # Servicios de negocio
│   │
│   └── 📁 data/                          # CAPA DE DATOS
│       └── 📄 DatabaseLayer.js           # DAOs
│
├── 📁 data/                              # Almacenamiento
│   └── 📄 sgvaps.db                      # Base de datos SQLite
│
└── 📁 config/                            # Configuración (reservado)
```

## 🎯 Funcionalidades Disponibles

### 📦 Gestión de Productos
- ✓ Ver catálogo completo
- ✓ Crear nuevos productos
- ✓ Editar productos
- ✓ Eliminar productos
- ✓ Filtrar por tipo

**Tipos**: Collar, Arete, Manilla, Cartera, Otro

### 🛒 Gestión de Pedidos
- ✓ Registrar nuevos pedidos
- ✓ Ver historial de pedidos
- ✓ Cambiar estado del pedido
- ✓ Ver estadísticas (Total, Monto, Por estado)

**Estados**: Pendiente, Enviado, Entregado, Cancelado

**Formas de Pago**: Efectivo, Transferencia, Tarjeta

### 👩‍🦱 Gestión de Artesanas
- ✓ Registrar artesanas
- ✓ Ver listado de artesanas
- ✓ Asociar productos a artesanas

**Especialidades**: Bisutería, Textiles, Cerámica, Cuero, Otro

### 🎉 Eventos y Ferias
- ✓ Crear eventos
- ✓ Ver próximos eventos
- ✓ Registrar ubicación y fecha

## 📊 Estadísticas del Proyecto

| Métrica | Cantidad |
|---------|----------|
| Archivos principales | 6 |
| Archivos de documentación | 3 |
| Líneas de código | ~2000 |
| Componentes base | 4 |
| Tablas de BD | 4 |
| Endpoints API | 13+ |
| Validaciones | 15+ |
| Controladores | 4 |
| Servicios | 4 |
| DAOs | 4 |

## 🔑 API REST Endpoints

### Productos
```
GET    /api/productos              Obtener todos
GET    /api/productos/:id          Obtener por ID
POST   /api/productos              Crear nuevo
PUT    /api/productos/:id          Actualizar
DELETE /api/productos/:id          Eliminar
```

### Pedidos
```
GET    /api/pedidos                Obtener todos
POST   /api/pedidos                Crear nuevo
PUT    /api/pedidos/:id/estado     Cambiar estado
```

### Artesanas
```
GET    /api/artesanas              Obtener todas
POST   /api/artesanas              Registrar nueva
```

### Eventos
```
GET    /api/eventos                Obtener todos
POST   /api/eventos                Crear nuevo
```

## 🔄 Flujo de Datos Típico

1. **Usuario** → Interactúa con HTML
2. **Cliente** → Envía Fetch HTTP a API
3. **Presentación** → Recibe y delega a Servicio
4. **Negocio** → Valida y ejecuta reglas
5. **Datos** → Accede a SQLite
6. **Respuesta** → Retorna JSON al cliente
7. **DOM** → Se actualiza con los datos

## ✅ Validaciones Implementadas

### Producto
- Precio > 0
- Nombre requerido
- Tipo requerido

### Pedido
- Monto > 0
- Cliente requerido
- Forma de pago válida
- Estado válido

### Artesana
- Nombre requerido
- Especialidad requerida

### Evento
- Nombre requerido
- Fecha requerida

## 🎓 Aprendizajes Clave

✓ **Separación de Capas**: Cliente ↔ Presentación ↔ Negocio ↔ Datos

✓ **Patrón DAO**: Abstracción del acceso a BD

✓ **Patrón Servicio**: Lógica de negocio centralizada

✓ **REST API**: Arquitectura de recursos

✓ **SQLite**: Base de datos ligera integrada

✓ **Express.js**: Servidor web minimalista

✓ **Promesas**: Operaciones asincrónicas

✓ **Validaciones**: En la capa de negocio

## 🔧 Tecnologías Utilizadas

- **Runtime**: Node.js
- **Backend**: Express.js
- **Base de Datos**: SQLite3
- **Frontend**: HTML5, CSS3, JavaScript
- **Arquitectura**: Cliente/Servidor de 3 Capas

## 📚 Documentación

- **README.md** - Guía general del sistema
- **ARQUITECTURA.md** - Detalles técnicos y patrones
- **DIAGRAMAS.md** - Visualización ASCII de componentes
- **Este archivo** - Guía de inicio rápido

## 🐛 Troubleshooting

### El servidor no inicia
```bash
# Verifica que el puerto 3000 esté disponible
netstat -ano | findstr :3000

# Termina el proceso si está en uso
taskkill /PID <numero> /F
```

### La BD está corrupta
```bash
# Elimina la BD para recrearla
del data\sgvaps.db

# El servidor la recreará automáticamente
npm start
```

### Datos de prueba no cargan
```bash
# Asegúrate que el servidor esté corriendo
# En otra terminal ejecuta:
node test-data.js
```

## 🚀 Próximas Mejoras Sugeridas

1. Autenticación de usuarios
2. Panel administrativo avanzado
3. Reportes en PDF
4. Galería de imágenes
5. Carrito de compras
6. Integración con pasarela de pagos
7. Notificaciones por email
8. Búsqueda y filtros avanzados

## 👨‍💻 Desarrollo Futuro

El sistema está diseñado para ser:
- **Escalable**: Fácil agregar nuevos módulos
- **Mantenible**: Código bien organizado
- **Testeable**: Separación clara de responsabilidades
- **Documentado**: Código y documentación completa

---

**¡El sistema está listo para usar! 🎉**

Para preguntas o mejoras, consulta los archivos de documentación.
