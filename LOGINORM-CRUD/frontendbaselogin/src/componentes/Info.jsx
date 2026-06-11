import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class Info extends React.Component {
    state = {
        id: "",
        pregunta: "",
        respuesta: "",
        opciones: []
    };

    componentDidMount() {
        const qId = new URLSearchParams(window.location.search).get("id");
        if (qId) {
            axios.get("Pregunta?id=" + qId)
                .then(response => {
                    const question = response.data[0];
                    this.setState({ ...question });
                })
                .catch(error => {
                    console.info(error);
                    alert("Ha ocurrido un error");
                });
        }
    }

    render() {
        const { pregunta, respuesta, opciones } = this.state;
        return (
            <Container className="mt-4">
                <nav className="mb-3">
                    <Button variant="success">
                        <Link to="/administrator" className="text-white text-decoration-none">Regresar</Link>
                    </Button>
                </nav>
                <h3>Información del Ejercicio</h3>
                <hr />
                <p><strong>Pregunta:</strong> {pregunta}</p>
                <p><strong>Respuesta correcta:</strong> {respuesta}</p>
                {opciones && opciones.length > 0 && (
                    <>
                        <p><strong>Opciones:</strong></p>
                        <ul>
                            {opciones.map((op, i) => (
                                <li key={i}><strong>{op.clave})</strong> {op.texto}</li>
                            ))}
                        </ul>
                    </>
                )}
            </Container>
        );
    }
}

export default Info;
