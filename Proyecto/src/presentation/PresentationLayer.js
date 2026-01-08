// ============================================
// CAPA DE PRESENTACIÓN - PresentationLayer
// Responsabilidad: Gestionar solicitudes HTTP y respuestas
// ============================================

// ============================================
// COMPONENTE 1: Controlador de Productos
// ============================================
class ProductoController {
  constructor(businessService) {
    this.businessService = businessService;
  }

  async obtenerProductos(req, res) {
    try {
      const productos = await this.businessService.obtenerProductos();
      res.json({
        exitoso: true,
        datos: productos,
        cantidad: productos.length
      });
    } catch (error) {
      res.status(400).json({
        exitoso: false,
        error: error.message
      });
    }
  }

  async obtenerProductoPorId(req, res) {
    try {
      const { id } = req.params;
      const producto = await this.businessService.obtenerProductoPorId(id);
      res.json({
        exitoso: true,
        datos: producto
      });
    } catch (error) {
      res.status(400).json({
        exitoso: false,
        error: error.message
      });
    }
  }

  async crearProducto(req, res) {
    try {
      const resultado = await this.businessService.crearProducto(req.body);
      res.status(201).json({
        exitoso: true,
        datos: resultado
      });
    } catch (error) {
      res.status(400).json({
        exitoso: false,
        error: error.message
      });
    }
  }

  async actualizarProducto(req, res) {
    try {
      const { id } = req.params;
      const resultado = await this.businessService.actualizarProducto(id, req.body);
      res.json({
        exitoso: true,
        datos: resultado
      });
    } catch (error) {
      res.status(400).json({
        exitoso: false,
        error: error.message
      });
    }
  }

  async eliminarProducto(req, res) {
    try {
      const { id } = req.params;
      const resultado = await this.businessService.eliminarProducto(id);
      res.json({
        exitoso: true,
        datos: resultado
      });
    } catch (error) {
      res.status(400).json({
        exitoso: false,
        error: error.message
      });
    }
  }
}

// ============================================
// COMPONENTE 2: Controlador de Pedidos
// ============================================
class PedidoController {
  constructor(businessService) {
    this.businessService = businessService;
  }

  async obtenerPedidos(req, res) {
    try {
      const pedidos = await this.businessService.obtenerPedidos();
      res.json({
        exitoso: true,
        datos: pedidos,
        cantidad: pedidos.length
      });
    } catch (error) {
      res.status(400).json({
        exitoso: false,
        error: error.message
      });
    }
  }

  async crearPedido(req, res) {
    try {
      const resultado = await this.businessService.crearPedido(req.body);
      res.status(201).json({
        exitoso: true,
        datos: resultado
      });
    } catch (error) {
      res.status(400).json({
        exitoso: false,
        error: error.message
      });
    }
  }

  async actualizarEstadoPedido(req, res) {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      const resultado = await this.businessService.actualizarEstadoPedido(id, estado);
      res.json({
        exitoso: true,
        datos: resultado
      });
    } catch (error) {
      res.status(400).json({
        exitoso: false,
        error: error.message
      });
    }
  }

  async obtenerEstadisticas(req, res) {
    try {
      const estadisticas = await this.businessService.obtenerEstadisticas();
      res.json({
        exitoso: true,
        datos: estadisticas
      });
    } catch (error) {
      res.status(400).json({
        exitoso: false,
        error: error.message
      });
    }
  }
}

// ============================================
// COMPONENTE 3: Controlador de Artesanas
// ============================================
class ArtesanaController {
  constructor(businessService) {
    this.businessService = businessService;
  }

  async obtenerArtesanas(req, res) {
    try {
      const artesanas = await this.businessService.obtenerArtesanas();
      res.json({
        exitoso: true,
        datos: artesanas,
        cantidad: artesanas.length
      });
    } catch (error) {
      res.status(400).json({
        exitoso: false,
        error: error.message
      });
    }
  }

  async crearArtesana(req, res) {
    try {
      const resultado = await this.businessService.crearArtesana(req.body);
      res.status(201).json({
        exitoso: true,
        datos: resultado
      });
    } catch (error) {
      res.status(400).json({
        exitoso: false,
        error: error.message
      });
    }
  }
}

// ============================================
// Controlador de Eventos
// ============================================
class EventoController {
  constructor(businessService) {
    this.businessService = businessService;
  }

  async obtenerEventos(req, res) {
    try {
      const eventos = await this.businessService.obtenerEventos();
      res.json({
        exitoso: true,
        datos: eventos,
        cantidad: eventos.length
      });
    } catch (error) {
      res.status(400).json({
        exitoso: false,
        error: error.message
      });
    }
  }

  async crearEvento(req, res) {
    try {
      const resultado = await this.businessService.crearEvento(req.body);
      res.status(201).json({
        exitoso: true,
        datos: resultado
      });
    } catch (error) {
      res.status(400).json({
        exitoso: false,
        error: error.message
      });
    }
  }
}

// ============================================
// Controlador de Presentación Principal
// ============================================
class PresentationController {
  constructor(businessService) {
    this.productoController = new ProductoController(businessService);
    this.pedidoController = new PedidoController(businessService);
    this.artesanaController = new ArtesanaController(businessService);
    this.eventoController = new EventoController(businessService);
  }

  // Delegación a ProductoController
  obtenerProductos(req, res) {
    return this.productoController.obtenerProductos(req, res);
  }

  obtenerProductoPorId(req, res) {
    return this.productoController.obtenerProductoPorId(req, res);
  }

  crearProducto(req, res) {
    return this.productoController.crearProducto(req, res);
  }

  actualizarProducto(req, res) {
    return this.productoController.actualizarProducto(req, res);
  }

  eliminarProducto(req, res) {
    return this.productoController.eliminarProducto(req, res);
  }

  // Delegación a PedidoController
  obtenerPedidos(req, res) {
    return this.pedidoController.obtenerPedidos(req, res);
  }

  crearPedido(req, res) {
    return this.pedidoController.crearPedido(req, res);
  }

  actualizarEstadoPedido(req, res) {
    return this.pedidoController.actualizarEstadoPedido(req, res);
  }

  // Delegación a ArtesanaController
  obtenerArtesanas(req, res) {
    return this.artesanaController.obtenerArtesanas(req, res);
  }

  crearArtesana(req, res) {
    return this.artesanaController.crearArtesana(req, res);
  }

  // Delegación a EventoController
  obtenerEventos(req, res) {
    return this.eventoController.obtenerEventos(req, res);
  }

  crearEvento(req, res) {
    return this.eventoController.crearEvento(req, res);
  }
}

// ============================================
// Exportar módulo
// ============================================
module.exports = {
  PresentationController: PresentationController,
  ProductoController: ProductoController,
  PedidoController: PedidoController,
  ArtesanaController: ArtesanaController,
  EventoController: EventoController
};
