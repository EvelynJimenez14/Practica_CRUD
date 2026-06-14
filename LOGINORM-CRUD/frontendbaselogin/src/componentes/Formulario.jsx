import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

class Formulario extends React.Component {

    state = {
        producto: "",
        categoria: "",
        precio: "",
        stock: "",
        ventasMensuales: "",
        saved: false
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    guardar = () => {

        const {
            producto,
            categoria,
            precio,
            stock,
            ventasMensuales
        } = this.state;

        const payload = {
            producto,
            categoria,
            precio,
            stock,
            ventasMensuales
        };

        axios.post("Pregunta", payload)
            .then(() => {

                Swal.fire({
                    icon: "success",
                    title: "Producto guardado",
                    timer: 1500,
                    showConfirmButton: false
                });

                this.setState({
                    saved: true
                });

            })
            .catch(() => {

                Swal.fire({
                    icon: "error",
                    title: "Error al guardar producto"
                });

            });
    };

    render() {

        if (this.state.saved)
            return <Navigate to="/administrator" />;

        const {
            producto,
            categoria,
            precio,
            stock,
            ventasMensuales
        } = this.state;

        return (

            <Container
                className="mt-4"
                style={{ maxWidth: "600px" }}
            >

                <nav className="mb-3">
                    <Button variant="success">
                        <Link
                            to="/administrator"
                            className="text-white text-decoration-none"
                        >
                            Regresar
                        </Link>
                    </Button>
                </nav>

                <h3>NUEVO PRODUCTO</h3>

                <hr />

                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label>Producto</Form.Label>
                        <Form.Control
                            type="text"
                            name="producto"
                            value={producto}
                            onChange={this.handleChange}
                            placeholder="Ej. Laptop HP"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Control
                            type="text"
                            name="categoria"
                            value={categoria}
                            onChange={this.handleChange}
                            placeholder="Ej. Electrónica"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            name="precio"
                            value={precio}
                            onChange={this.handleChange}
                            placeholder="15000"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            name="stock"
                            value={stock}
                            onChange={this.handleChange}
                            placeholder="20"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ventas Mensuales</Form.Label>
                        <Form.Control
                            type="number"
                            name="ventasMensuales"
                            value={ventasMensuales}
                            onChange={this.handleChange}
                            placeholder="35"
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                        <Button
                            variant="primary"
                            onClick={this.guardar}
                        >
                            GUARDAR PRODUCTO
                        </Button>
                    </div>

                </Form>

            </Container>
        );
    }
}

export default Formulario;