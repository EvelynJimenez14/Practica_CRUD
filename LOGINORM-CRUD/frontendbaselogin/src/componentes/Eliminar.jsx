import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Eliminar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/productos/${id}`);
                setProducto(res.data);
            } catch (err) {
                console.error("Error al obtener producto:", err);
            }
        };
        fetchProducto();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/productos/${id}`);
            navigate("/productos");
        } catch (err) {
            console.error("Error al eliminar producto:", err);
        }
    };

    if (!producto) {
        return <div className="container mt-4">Cargando producto...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Eliminar Producto</h2>
            <p>¿Estás seguro que deseas eliminar el producto <strong>{producto.nombre}</strong>?</p>
            <button className="btn btn-danger me-2" onClick={handleDelete}>Sí, eliminar</button>
            <button className="btn btn-secondary" onClick={() => navigate("/productos")}>Cancelar</button>
        </div>
    );
}

export default Eliminar;
