import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

class Administrator extends React.Component {
    state = {
        data: [],
        logout: false
    };

    componentDidMount() {
        axios.get("http://localhost:8080/api/productos")
            .then(response => {
                this.setState({ data: response.data });
            })
            .catch(error => {
                console.error("Error al obtener productos:", error);
                alert("ERROR EN LA OBTENCIÓN DE DATOS");
            });
    }

    render() {
        const { data, logout } = this.state;

        if (logout) return <Navigate to="/" />;

        return (
            <Container className="mt-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">Bienvenido: <strong>admin</strong></h5>
                    <a href="#"
                        onClick={(e) => { e.preventDefault(); this.setState({ logout: true }); }}
                        className="text-danger small-link">
                        Salir de la aplicación
                    </a>
                </div>

                <h2 className="text-center">GESTIÓN DE PRODUCTOS</h2>


                <Button variant="success" className="mb-3">
                    <Link to="/nuevo" className="text-white text-decoration-none">
                        NUEVO PRODUCTO
                    </Link>
                </Button>


                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map(prod => (
                                <tr key={prod.idProducto}>
                                    <td>{prod.nombre}</td>
                                    <td>{prod.categoria}</td>
                                    <td>${prod.precio}</td>
                                    <td>{prod.cantidad}</td>
                                    <td className="text-center">
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No hay productos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default Administrator;
