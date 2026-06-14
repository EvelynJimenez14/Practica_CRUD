const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const url = require("url");
const cors = require("cors");

const app = express();
const puerto = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Conexión administrativa
const adminSequelize = new Sequelize("", "root", "1234", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    logging: false
});

// Conexión usuarios
const sequelizeUsuarios = new Sequelize("usuarios", "root", "1234", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    logging: false
});

// Conexión PrediccionDemanda
const sequelizePrediccion = new Sequelize("PrediccionDemanda", "root", "1234", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    logging: false
});

// Modelo login
const LoginUser = sequelizeUsuarios.define("LoginUser", {
    idLOGIN: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    USERNAME: { type: DataTypes.STRING(45), allowNull: false, unique: true },
    PASSWORD: { type: DataTypes.STRING(45), allowNull: false },
    TIPOUSUARIO: { type: DataTypes.STRING(45), allowNull: false }
}, { tableName: "login", timestamps: false });

// Modelo productos
const Producto = sequelizePrediccion.define("Producto", {
    idProducto: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    categoria: { type: DataTypes.STRING(50) },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
}, { tableName: "productos", timestamps: false });

// Endpoint login
app.get("/Login", async (req, res) => {
    const q = url.parse(req.url, true).query;
    try {
        const result = await LoginUser.findOne({
            where: { USERNAME: q.user, PASSWORD: q.password }
        });
        if (result) {
            console.log("Login exitoso para usuario:", q.user);
            res.json({ status: "yes", tipo: result.TIPOUSUARIO });
        } else {
            console.log("Login fallido para usuario:", q.user);
            res.json({ status: "no", tipo: "nodefinido" });
        }
    } catch (err) {
        console.error("Error en login:", err);
        res.json({ status: "no", tipo: "error" });
    }
});

// CRUD productos
app.get("/api/productos", async (req, res) => {
    const productos = await Producto.findAll();
    console.log("Consulta de productos realizada. Total:", productos.length);
    res.json(productos);
});

app.get("/api/productos/:id", async (req, res) => {
    const p = await Producto.findByPk(req.params.id);
    if (p) {
        console.log("Consulta de producto con id:", req.params.id);
        res.json(p);
    } else {
        console.log("Producto no encontrado con id:", req.params.id);
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

app.post("/api/productos", async (req, res) => {
    try {
        const nuevo = await Producto.create(req.body);
        console.log("Nuevo producto creado:", nuevo.nombre);
        res.json(nuevo);
    } catch (err) {
        console.error("Error al crear producto:", err);
        res.status(500).json({ error: "No se pudo crear el producto" });
    }
});

app.put("/api/productos/:id", async (req, res) => {
    try {
        await Producto.update(req.body, { where: { idProducto: req.params.id } });
        console.log("Producto actualizado con id:", req.params.id);
        res.json({ ok: true });
    } catch (err) {
        console.error("Error al actualizar producto:", err);
        res.status(500).json({ error: "No se pudo actualizar el producto" });
    }
});

app.delete("/api/productos/:id", async (req, res) => {
    try {
        const eliminado = await Producto.destroy({ where: { idProducto: req.params.id } });
        if (eliminado) {
            console.log("Producto eliminado con id:", req.params.id);
            res.json({ ok: true });
        } else {
            console.log("No se encontró producto para eliminar con id:", req.params.id);
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (err) {
        console.error("Error al eliminar producto:", err);
        res.status(500).json({ error: "No se pudo eliminar el producto" });
    }
});

// Inicialización
async function inicializar() {
    try {
        await adminSequelize.query("DROP DATABASE IF EXISTS usuarios;");
        await adminSequelize.query("CREATE DATABASE usuarios;");
        await adminSequelize.query("DROP DATABASE IF EXISTS PrediccionDemanda;");
        await adminSequelize.query("CREATE DATABASE PrediccionDemanda;");

        await sequelizeUsuarios.sync({ force: true });
        await sequelizePrediccion.sync({ force: true });

        console.log("Conexión exitosa a BD 'usuarios' y 'PrediccionDemanda'");

        await LoginUser.create({ USERNAME: "admin", PASSWORD: "1234", TIPOUSUARIO: "administrador" });
        console.log("Usuario administrador creado");

        await Producto.bulkCreate([
            { nombre: "Laptop X", descripcion: "Laptop 15'' 8GB RAM", precio: 15000, cantidad: 20, categoria: "Electrónica" },
            { nombre: "Smartphone Y", descripcion: "Teléfono Android 128GB", precio: 8000, cantidad: 50, categoria: "Electrónica" },
            { nombre: "Televisor Z", descripcion: "Pantalla LED 50'' Full HD", precio: 12000, cantidad: 15, categoria: "Electrodomésticos" }
        ]);
        console.log("Productos iniciales insertados");

        app.listen(puerto, () => console.log("Servidor escuchando en puerto:", puerto));
    } catch (err) {
        console.error("Error en inicialización:", err);
    }
}

inicializar();
