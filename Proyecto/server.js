// ============================================
// SISTEMA DE GESTIÓN Y VENTA DE ARTESANÍAS (SGV-APS)
// Arquitectura Cliente/Servidor - 3 Capas
// ============================================

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importar capas
const dataLayer = require('./src/data/DatabaseLayer');
const businessLayer = require('./src/business/BusinessLayer');
const presentationLayer = require('./src/presentation/PresentationLayer');

// Crear aplicación Express
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Inicializar base de datos
dataLayer.initDatabase();

// Crear instancia de la capa de negocio
const business = new businessLayer.BusinessService(dataLayer);

// Crear instancia de la capa de presentación
const presentation = new presentationLayer.PresentationController(business);

// ============================================
// RUTAS - Capa de Presentación (API REST)
// ============================================

// PRODUCTOS
app.get('/api/productos', (req, res) => {
  presentation.obtenerProductos(req, res);
});

app.get('/api/productos/:id', (req, res) => {
  presentation.obtenerProductoPorId(req, res);
});

app.post('/api/productos', (req, res) => {
  presentation.crearProducto(req, res);
});

app.put('/api/productos/:id', (req, res) => {
  presentation.actualizarProducto(req, res);
});

app.delete('/api/productos/:id', (req, res) => {
  presentation.eliminarProducto(req, res);
});

// ARTESANAS
app.get('/api/artesanas', (req, res) => {
  presentation.obtenerArtesanas(req, res);
});

app.post('/api/artesanas', (req, res) => {
  presentation.crearArtesana(req, res);
});

// PEDIDOS
app.get('/api/pedidos', (req, res) => {
  presentation.obtenerPedidos(req, res);
});

app.post('/api/pedidos', (req, res) => {
  presentation.crearPedido(req, res);
});

app.put('/api/pedidos/:id/estado', (req, res) => {
  presentation.actualizarEstadoPedido(req, res);
});

// EVENTOS/FERIAS
app.get('/api/eventos', (req, res) => {
  presentation.obtenerEventos(req, res);
});

app.post('/api/eventos', (req, res) => {
  presentation.crearEvento(req, res);
});

// Ruta para servir página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor', detalles: err.message });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`╔════════════════════════════════════════════════════════════╗`);
  console.log(`║  SGV-APS - Sistema de Gestión de Artesanías Saraguro       ║`);
  console.log(`║  Servidor ejecutándose en http://localhost:${PORT}              ║`);
  console.log(`║  Arquitectura: Cliente/Servidor - 3 Capas                 ║`);
  console.log(`╚════════════════════════════════════════════════════════════╝`);
});
