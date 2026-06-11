const express = require("express");
const app = express();
const puerto = 8080;
const { Sequelize, DataTypes } = require("sequelize");

app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});


const adminSequelize = new Sequelize('', 'root', '1234', {
    host: 'localhost', port: 3306, dialect: 'mysql', logging: false
});

const sequelizeUsuarios = new Sequelize('usuarios', 'root', '1234', {
    host: 'localhost', port: 3306, dialect: 'mysql', logging: false
});

const sequelizeCrud = new Sequelize('crudjson', 'root', '1234', {
    host: 'localhost', port: 3306, dialect: 'mysql', logging: false
});


const LoginUser = sequelizeUsuarios.define('LoginUser', {
    idLOGIN: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING(45), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(45), allowNull: false },
    tipousuario: { type: DataTypes.STRING(45), allowNull: false }
}, { tableName: 'login', timestamps: false });

const TablaJson = sequelizeCrud.define('TablaJson', {
    idEjercicio: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    columnajson: { type: DataTypes.JSON, allowNull: false }
}, { tableName: 'tablajson', timestamps: false });


app.get("/Login", async (req, res) => {
    try {
        const { user, password } = req.query;
        const result = await LoginUser.findOne({
            where: { username: user, password: password }
        });

        if (result) {
            res.json({ status: "yes", tipo: result.tipousuario });
        } else {
            res.json({ status: "no", tipo: "nodefinido" });
        }
    } catch (err) {
        res.status(500).json({ status: "no", tipo: "error", message: err.message });
    }
});

app.get("/Preguntas", async (req, res) => {
    try {
        const result = await TablaJson.findAll();
        const respuestas = result.map(r => r.columnajson);
        res.json(respuestas);
    } catch (err) {
        res.json([]);
    }
});

app.get("/Pregunta", async (req, res) => {
    try {
        const { id } = req.query;
        const result = await TablaJson.findByPk(id);

        if (result) {
            res.json([result.columnajson]);
        } else {
            res.json([]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/Pregunta", async (req, res) => {
    try {
        const nuevoRegistro = await TablaJson.create({ columnajson: req.body });
        res.json({ ok: true, id: nuevoRegistro.idEjercicio });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/Pregunta", async (req, res) => {
    try {
        const { id } = req.query;
        const body = req.body;
        body.id = String(id);

        await TablaJson.update({ columnajson: body }, {
            where: { idEjercicio: id }
        });
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/Pregunta", async (req, res) => {
    try {
        const { id } = req.query;
        await TablaJson.destroy({
            where: { idEjercicio: id }
        });
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

async function inicializar() {
    try {
        await adminSequelize.query('DROP DATABASE IF EXISTS usuarios;');
        await adminSequelize.query('CREATE DATABASE usuarios;');
        await adminSequelize.query('CREATE DATABASE IF NOT EXISTS crudjson;');
        await adminSequelize.close();

        await sequelizeUsuarios.sync({ force: true });
        await sequelizeCrud.sync();

        await LoginUser.create({ username: 'admin', password: '1234', tipousuario: 'administrador' });

        app.listen(puerto, () => console.log("Servidor en puerto: " + puerto));
    } catch (err) {
        console.error("Error de inicialización en BD:", err);
    }
}

inicializar();