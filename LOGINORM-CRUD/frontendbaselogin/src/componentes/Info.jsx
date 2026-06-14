import React from "react";
import { Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class Info extends React.Component {
    state = {
        idProducto: "",
        nombre: "",
        descripcion: "",
        categoria: "",
        precio: "",
        cantidad: "",
        ventasMensuales: ""
    };

    componentDidMount() {
        const qId = new URLSearchParams(window.location.search).get("id");

        if (qId) {
            axios.get(`http://localhost:8080/api/productos/${qId}`)
                .then(response => {
                    const producto = response.data;

                    this.setState({
                        idProducto: producto.idProducto || "",
                        nombre: producto.nombre || "",
                        descripcion: producto.descripcion || "",
                        categoria: producto.categoria || "",
                        precio: producto.precio || "",
                        cantidad: producto.cantidad || "",
                        ventasMensuales: producto.ventasMensuales || 0 // si luego agregas ventas
                    });
                })
                .catch(error => {
                    console.error(error);
                    alert("Error al cargar la información");
                });
        }
    }

    render() {
        const { nombre, descripcion, categoria, precio, cantidad, ventasMensuales } = this.state;

        const prediccion = Math.round((Number(ventasMensuales) || 0) * 1.15);

        return (
            <Container className="mt-4">
                <nav className="mb-3">
                    <Button variant="secondary">
                        <Link to="/administrator" className="text-white text-decoration-none">
                            Regresar
                        </Link>
                    </Button>
                </nav>

                <Card>
                    <Card.Header>
                        <h3>Información del Producto</h3>
                    </Card.Header>
                    <Card.Body>
                        <p><strong>Producto:</strong> {nombre}</p>
                        <p><strong>Descripción:</strong> {descripcion}</p>
                        <p><strong>Categoría:</strong> {categoria}</p>
                        <p><strong>Precio:</strong> ${precio}</p>
                        <p><strong>Stock:</strong> {cantidad}</p>
                        <p><strong>Ventas Mensuales:</strong> {ventasMensuales}</p>

                        <hr />
                        <h4>Predicción de Demanda</h4>
                        <p>Demanda estimada para el siguiente periodo:</p>
                        <h2 className="text-primary">{prediccion} unidades</h2>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default Info;
