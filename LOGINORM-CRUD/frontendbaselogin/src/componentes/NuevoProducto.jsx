import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function NuevoProducto() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        cantidad: "",
        categoria: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/productos", formData);
            alert("Producto creado correctamente");
            navigate("/administrator");
        } catch (err) {
            console.error("Error al agregar producto:", err);
            alert("Error al guardar producto");
        }
    };

    return (
        <div className="container mt-4">
            <nav className="mb-3">
                <Button variant="secondary">
                    <Link to="/administrator" className="text-white text-decoration-none">
                        Regresar
                    </Link>
                </Button>
            </nav>

            <h2>Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre}
                    onChange={handleChange} className="form-control mb-2" required />
                <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion}
                    onChange={handleChange} className="form-control mb-2" />
                <input type="number" name="precio" placeholder="Precio" value={formData.precio}
                    onChange={handleChange} className="form-control mb-2" required />
                <input type="number" name="cantidad" placeholder="Cantidad" value={formData.cantidad}
                    onChange={handleChange} className="form-control mb-2" required />
                <input type="text" name="categoria" placeholder="Categoría" value={formData.categoria}
                    onChange={handleChange} className="form-control mb-2" />
                <button type="submit" className="btn btn-success">Guardar</button>
            </form>
        </div>
    );
}

export default NuevoProducto;
