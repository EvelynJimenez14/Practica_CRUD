import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

class Formulario extends React.Component {
    state = {
        pregunta: "",
        respuesta: "A",
        opA: "",
        opB: "",
        opC: "",
        opD: "",
        saved: false
    };

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    guardar = () => {
        const { pregunta, respuesta, opA, opB, opC, opD } = this.state;
        const payload = {
            pregunta,
            respuesta,
            opciones: [
                { clave: "A", texto: opA },
                { clave: "B", texto: opB },
                { clave: "C", texto: opC },
                { clave: "D", texto: opD }
            ]
        };
        axios.post("Pregunta", payload)
            .then(() => {
                Swal.fire({ icon: 'success', title: 'Pregunta guardada', timer: 1400, showConfirmButton: false });
                this.setState({ saved: true });
            })
            .catch(() => {
                Swal.fire({ icon: 'error', title: 'Error al guardar' });
            });
    };

    render() {
        if (this.state.saved) return <Navigate to="/administrator" />;
        const { pregunta, respuesta, opA, opB, opC, opD } = this.state;
        return (
            <Container className="mt-4" style={{ maxWidth: '600px' }}>
                <nav className="mb-3">
                    <Button variant="success">
                        <Link to="/administrator" className="text-white text-decoration-none">Regresar al CRUD</Link>
                    </Button>
                </nav>
                <h3>NUEVA PREGUNTA</h3>
                <hr />
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Pregunta</Form.Label>
                        <Form.Control as="textarea" rows={3} name="pregunta" value={pregunta} onChange={this.handleChange} placeholder="Escribe la pregunta..." />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Respuesta correcta</Form.Label>
                        <Form.Select name="respuesta" value={respuesta} onChange={this.handleChange}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Opción A</Form.Label>
                        <Form.Control name="opA" value={opA} onChange={this.handleChange} placeholder="Opción A" />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Opción B</Form.Label>
                        <Form.Control name="opB" value={opB} onChange={this.handleChange} placeholder="Opción B" />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Opción C</Form.Label>
                        <Form.Control name="opC" value={opC} onChange={this.handleChange} placeholder="Opción C" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Opción D</Form.Label>
                        <Form.Control name="opD" value={opD} onChange={this.handleChange} placeholder="Opción D" />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" onClick={this.guardar}>GUARDAR</Button>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default Formulario;
