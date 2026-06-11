import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Pregunta from "./Pregunta.jsx";
import axios from "axios";

class Administrator extends React.Component {
    state = {
        data: [],
        logout: false
    };

    componentDidMount() {
        axios.get("Preguntas")
            .then(response => {
                this.setState({ data: response.data });
            })
            .catch(error => {
                console.info(error);
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
                    <a href="#" onClick={(e) => { e.preventDefault(); this.setState({ logout: true }); }}
                       className="text-danger" style={{ fontSize: '14px' }}>
                        Salir de la aplicación
                    </a>
                </div>
                <h2 className="text-center">GESTIÓN DE EJERCICIOS</h2>
                <h6 className="text-center text-muted mb-3">Predicción de Demanda – e-commerce</h6>
                <hr />
                <Button variant="info" style={{ margin: "12px" }}>
                    <Link to="/formulario" className="text-white text-decoration-none">NUEVA PREGUNTA</Link>
                </Button>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Pregunta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(pregunta => (
                            <Pregunta key={pregunta.id} {...pregunta} />
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default Administrator;
