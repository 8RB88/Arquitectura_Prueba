// ============================================
// CAPA DE LÓGICA DE NEGOCIO - BusinessLayer
// Responsabilidad: Implementar reglas de negocio
// ============================================

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dataLayer = require('../data/DatabaseLayer');

const dbPath = path.join(__dirname, '../../data/sgvaps.db');

// ============================================
// COMPONENTE 1: Servicio de Gestión de Productos
// ============================================
class ProductoService {
  constructor(db) {
    this.db = db;
    this.productoDAO = new dataLayer.ProductoDAO(db);
  }

  async crear(producto) {
    // Validación de negocio
    if (!producto.nombre || !producto.tipo || producto.precio <= 0) {
      throw new Error('Datos de producto inválidos');
    }

    try {
      const id = await this.productoDAO.crear(producto);
      return { id, mensaje: 'Producto creado exitosamente' };
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }

  async obtenerTodos() {
    try {
      return await this.productoDAO.obtenerTodos();
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }

  async obtenerPorId(id) {
    try {
      const producto = await this.productoDAO.obtenerPorId(id);
      if (!producto) {
        throw new Error('Producto no encontrado');
      }
      return producto;
    } catch (error) {
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  }

  async actualizar(id, producto) {
    if (!producto.nombre || !producto.tipo || producto.precio <= 0) {
      throw new Error('Datos de producto inválidos');
    }

    try {
      const cambios = await this.productoDAO.actualizar(id, producto);
      if (cambios === 0) {
        throw new Error('Producto no encontrado');
      }
      return { mensaje: 'Producto actualizado exitosamente' };
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  }

  async eliminar(id) {
    try {
      const cambios = await this.productoDAO.eliminar(id);
      if (cambios === 0) {
        throw new Error('Producto no encontrado');
      }
      return { mensaje: 'Producto eliminado exitosamente' };
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${error.message}`);
    }
  }

  async obtenerPorTipo(tipo) {
    try {
      const productos = await this.productoDAO.obtenerTodos();
      return productos.filter(p => p.tipo.toLowerCase() === tipo.toLowerCase());
    } catch (error) {
      throw new Error(`Error al filtrar productos: ${error.message}`);
    }
  }
}

// ============================================
// COMPONENTE 2: Servicio de Gestión de Pedidos
// ============================================
class PedidoService {
  constructor(db) {
    this.db = db;
    this.pedidoDAO = new dataLayer.PedidoDAO(db);
  }

  async crear(pedido) {
    // Validación de negocio
    if (!pedido.cliente_nombre || pedido.monto_total <= 0) {
      throw new Error('Datos de pedido inválidos');
    }

    // Validar forma de pago
    const formasPagoValidas = ['efectivo', 'transferencia', 'tarjeta'];
    if (pedido.forma_pago && !formasPagoValidas.includes(pedido.forma_pago.toLowerCase())) {
      throw new Error('Forma de pago no válida');
    }

    try {
      const id = await this.pedidoDAO.crear(pedido);
      return { 
        id, 
        estado: 'pendiente',
        mensaje: 'Pedido registrado exitosamente' 
      };
    } catch (error) {
      throw new Error(`Error al crear pedido: ${error.message}`);
    }
  }

  async obtenerTodos() {
    try {
      return await this.pedidoDAO.obtenerTodos();
    } catch (error) {
      throw new Error(`Error al obtener pedidos: ${error.message}`);
    }
  }

  async actualizarEstado(id, estado) {
    // Validar estados permitidos
    const estadosValidos = ['pendiente', 'enviado', 'entregado', 'cancelado'];
    if (!estadosValidos.includes(estado.toLowerCase())) {
      throw new Error(`Estado no válido. Estados permitidos: ${estadosValidos.join(', ')}`);
    }

    try {
      const cambios = await this.pedidoDAO.actualizarEstado(id, estado);
      if (cambios === 0) {
        throw new Error('Pedido no encontrado');
      }
      return { mensaje: `Pedido actualizado a estado: ${estado}` };
    } catch (error) {
      throw new Error(`Error al actualizar pedido: ${error.message}`);
    }
  }

  async obtenerEstadisticas() {
    try {
      const pedidos = await this.pedidoDAO.obtenerTodos();
      return {
        totalPedidos: pedidos.length,
        montoTotal: pedidos.reduce((sum, p) => sum + p.monto_total, 0),
        porEstado: {
          pendiente: pedidos.filter(p => p.estado === 'pendiente').length,
          enviado: pedidos.filter(p => p.estado === 'enviado').length,
          entregado: pedidos.filter(p => p.estado === 'entregado').length
        }
      };
    } catch (error) {
      throw new Error(`Error al obtener estadísticas: ${error.message}`);
    }
  }
}

// ============================================
// COMPONENTE 3: Servicio de Gestión de Artesanas
// ============================================
class ArtesanaService {
  constructor(db) {
    this.db = db;
    this.artesanaDAO = new dataLayer.ArtesanaDAO(db);
  }

  async crear(artesana) {
    // Validación de negocio
    if (!artesana.nombre || !artesana.especialidad) {
      throw new Error('Datos de artesana inválidos');
    }

    try {
      const id = await this.artesanaDAO.crear(artesana);
      return { id, mensaje: 'Artesana registrada exitosamente' };
    } catch (error) {
      throw new Error(`Error al crear artesana: ${error.message}`);
    }
  }

  async obtenerTodas() {
    try {
      return await this.artesanaDAO.obtenerTodas();
    } catch (error) {
      throw new Error(`Error al obtener artesanas: ${error.message}`);
    }
  }
}

// ============================================
// Servicio de Eventos
// ============================================
class EventoService {
  constructor(db) {
    this.db = db;
    this.eventoDAO = new dataLayer.EventoDAO(db);
  }

  async crear(evento) {
    if (!evento.nombre || !evento.fecha) {
      throw new Error('Datos de evento inválidos');
    }

    try {
      const id = await this.eventoDAO.crear(evento);
      return { id, mensaje: 'Evento registrado exitosamente' };
    } catch (error) {
      throw new Error(`Error al crear evento: ${error.message}`);
    }
  }

  async obtenerTodos() {
    try {
      return await this.eventoDAO.obtenerTodos();
    } catch (error) {
      throw new Error(`Error al obtener eventos: ${error.message}`);
    }
  }
}

// ============================================
// Servicio de Negocio Principal
// ============================================
class BusinessService {
  constructor(dataLayer) {
    const db = new sqlite3.Database(dbPath);
    this.productoService = new ProductoService(db);
    this.pedidoService = new PedidoService(db);
    this.artesanaService = new ArtesanaService(db);
    this.eventoService = new EventoService(db);
  }

  // Métodos delegados para Productos
  crearProducto(producto) {
    return this.productoService.crear(producto);
  }

  obtenerProductos() {
    return this.productoService.obtenerTodos();
  }

  obtenerProductoPorId(id) {
    return this.productoService.obtenerPorId(id);
  }

  actualizarProducto(id, producto) {
    return this.productoService.actualizar(id, producto);
  }

  eliminarProducto(id) {
    return this.productoService.eliminar(id);
  }

  obtenerProductosPorTipo(tipo) {
    return this.productoService.obtenerPorTipo(tipo);
  }

  // Métodos delegados para Pedidos
  crearPedido(pedido) {
    return this.pedidoService.crear(pedido);
  }

  obtenerPedidos() {
    return this.pedidoService.obtenerTodos();
  }

  actualizarEstadoPedido(id, estado) {
    return this.pedidoService.actualizarEstado(id, estado);
  }

  obtenerEstadisticas() {
    return this.pedidoService.obtenerEstadisticas();
  }

  // Métodos delegados para Artesanas
  crearArtesana(artesana) {
    return this.artesanaService.crear(artesana);
  }

  obtenerArtesanas() {
    return this.artesanaService.obtenerTodas();
  }

  // Métodos delegados para Eventos
  crearEvento(evento) {
    return this.eventoService.crear(evento);
  }

  obtenerEventos() {
    return this.eventoService.obtenerTodos();
  }
}

// ============================================
// Exportar módulo
// ============================================
module.exports = {
  BusinessService: BusinessService,
  ProductoService: ProductoService,
  PedidoService: PedidoService,
  ArtesanaService: ArtesanaService,
  EventoService: EventoService
};
