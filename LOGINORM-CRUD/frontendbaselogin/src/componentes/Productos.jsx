import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Productos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/productos");
            setProductos(res.data);
        } catch (err) {
            console.error("Error al obtener productos:", err);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Gestión de Productos</h2>

            <Link to="/nuevo" className="btn btn-success mb-3">
                Nuevo Producto
            </Link>


            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((prod) => (
                        <tr key={prod.idProducto}>
                            <td>{prod.nombre}</td>
                            <td>{prod.descripcion}</td>
                            <td>${prod.precio}</td>
                            <td>{prod.cantidad}</td>
                            <td>{prod.categoria}</td>
                            <td className="AlignCenter">
                                <Button variant="info" className="me-2">
                                    <Link to={`/info?id=${prod.idProducto}`} className="text-white text-decoration-none">
                                        Ver
                                    </Link>
                                </Button>
                                <Button variant="warning" className="me-2">
                                    <Link to={`/editar/${prod.idProducto}`} className="text-dark text-decoration-none">
                                        Editar
                                    </Link>
                                </Button>
                                <Button variant="danger">
                                    <Link to={`/eliminar/${prod.idProducto}`} className="text-white text-decoration-none">
                                        Eliminar
                                    </Link>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Productos;
