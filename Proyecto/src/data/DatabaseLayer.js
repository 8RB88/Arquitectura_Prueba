// ============================================
// CAPA DE DATOS - DatabaseLayer
// Responsabilidad: Gestionar acceso a la base de datos
// ============================================

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../data/sgvaps.db');

// ============================================
// COMPONENTE 1: DataAccessObject (DAO) para Productos
// ============================================
class ProductoDAO {
  constructor(db) {
    this.db = db;
  }

  crear(producto) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO productos (nombre, tipo, descripcion, materiales, precio, stock, artesana_id) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
      this.db.run(sql, [
        producto.nombre,
        producto.tipo,
        producto.descripcion,
        producto.materiales,
        producto.precio,
        producto.stock,
        producto.artesana_id
      ], function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  obtenerTodos() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT p.*, a.nombre as artesana_nombre FROM productos p 
                   LEFT JOIN artesanas a ON p.artesana_id = a.id`;
      this.db.all(sql, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  obtenerPorId(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT p.*, a.nombre as artesana_nombre FROM productos p 
                   LEFT JOIN artesanas a ON p.artesana_id = a.id WHERE p.id = ?`;
      this.db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  actualizar(id, producto) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE productos SET nombre=?, tipo=?, descripcion=?, materiales=?, precio=?, stock=?, artesana_id=? WHERE id=?`;
      this.db.run(sql, [
        producto.nombre,
        producto.tipo,
        producto.descripcion,
        producto.materiales,
        producto.precio,
        producto.stock,
        producto.artesana_id,
        id
      ], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }

  eliminar(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM productos WHERE id = ?`;
      this.db.run(sql, [id], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }
}

// ============================================
// COMPONENTE 2: DataAccessObject (DAO) para Pedidos
// ============================================
class PedidoDAO {
  constructor(db) {
    this.db = db;
  }

  crear(pedido) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO pedidos (cliente_nombre, cliente_email, estado, monto_total, forma_pago, fecha) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
      this.db.run(sql, [
        pedido.cliente_nombre,
        pedido.cliente_email,
        pedido.estado,
        pedido.monto_total,
        pedido.forma_pago,
        new Date().toISOString()
      ], function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  obtenerTodos() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM pedidos ORDER BY fecha DESC`;
      this.db.all(sql, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  actualizarEstado(id, estado) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE pedidos SET estado=? WHERE id=?`;
      this.db.run(sql, [estado, id], function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  }
}

// ============================================
// COMPONENTE 3: DataAccessObject (DAO) para Artesanas
// ============================================
class ArtesanaDAO {
  constructor(db) {
    this.db = db;
  }

  crear(artesana) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO artesanas (nombre, especialidad, telefono, email) 
                   VALUES (?, ?, ?, ?)`;
      this.db.run(sql, [
        artesana.nombre,
        artesana.especialidad,
        artesana.telefono,
        artesana.email
      ], function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  obtenerTodas() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM artesanas`;
      this.db.all(sql, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

// ============================================
// DataAccessObject (DAO) para Eventos
// ============================================
class EventoDAO {
  constructor(db) {
    this.db = db;
  }

  crear(evento) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO eventos (nombre, descripcion, fecha, ubicacion) 
                   VALUES (?, ?, ?, ?)`;
      this.db.run(sql, [
        evento.nombre,
        evento.descripcion,
        evento.fecha,
        evento.ubicacion
      ], function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  obtenerTodos() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM eventos ORDER BY fecha DESC`;
      this.db.all(sql, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

// ============================================
// Inicialización de Base de Datos
// ============================================
function initDatabase() {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
    } else {
      console.log('✓ Conexión a base de datos establecida');
      crearTablas(db);
    }
  });
  return db;
}

function crearTablas(db) {
  // Tabla de Artesanas
  db.run(`CREATE TABLE IF NOT EXISTS artesanas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    especialidad TEXT NOT NULL,
    telefono TEXT,
    email TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabla de Productos
  db.run(`CREATE TABLE IF NOT EXISTS productos (
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
  )`);

  // Tabla de Pedidos
  db.run(`CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_nombre TEXT NOT NULL,
    cliente_email TEXT,
    estado TEXT DEFAULT 'pendiente',
    monto_total REAL NOT NULL,
    forma_pago TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Tabla de Eventos/Ferias
  db.run(`CREATE TABLE IF NOT EXISTS eventos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    ubicacion TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  console.log('✓ Tablas de base de datos creadas');
}

// ============================================
// Exportar módulo
// ============================================
module.exports = {
  initDatabase: initDatabase,
  obtenerDB: () => new sqlite3.Database(dbPath),
  ProductoDAO: ProductoDAO,
  PedidoDAO: PedidoDAO,
  ArtesanaDAO: ArtesanaDAO,
  EventoDAO: EventoDAO
};
