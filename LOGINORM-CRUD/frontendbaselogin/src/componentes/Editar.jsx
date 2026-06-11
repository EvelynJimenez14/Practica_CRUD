import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

class Editar extends React.Component {
    state = {
        id: "",
        pregunta: "",
        respuesta: "A",
        opA: "",
        opB: "",
        opC: "",
        opD: "",
        saved: false
    };

    componentDidMount() {
        const qId = new URLSearchParams(window.location.search).get("id");
        if (qId) {
            this.setState({ id: qId });
            axios.get("Pregunta?id=" + qId)
                .then(response => {
                    const q = response.data[0];
                    const ops = q.opciones || [];
                    this.setState({
                        pregunta: q.pregunta || "",
                        respuesta: q.respuesta || "A",
                        opA: (ops.find(o => o.clave === "A") || {}).texto || "",
                        opB: (ops.find(o => o.clave === "B") || {}).texto || "",
                        opC: (ops.find(o => o.clave === "C") || {}).texto || "",
                        opD: (ops.find(o => o.clave === "D") || {}).texto || ""
                    });
                })
                .catch(() => alert("Error al cargar el ejercicio"));
        }
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    guardar = () => {
        const { id, pregunta, respuesta, opA, opB, opC, opD } = this.state;
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
        axios.put("Pregunta?id=" + id, payload)
            .then(() => {
                Swal.fire({ icon: 'success', title: 'Ejercicio actualizado', timer: 1400, showConfirmButton: false });
                this.setState({ saved: true });
            })
            .catch(() => {
                Swal.fire({ icon: 'error', title: 'Error al actualizar' });
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
                <h3>EDITAR PREGUNTA</h3>
                <hr />
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Pregunta</Form.Label>
                        <Form.Control as="textarea" rows={3} name="pregunta" value={pregunta} onChange={this.handleChange} />
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
                        <Form.Control name="opA" value={opA} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Opción B</Form.Label>
                        <Form.Control name="opB" value={opB} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Opción C</Form.Label>
                        <Form.Control name="opC" value={opC} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Opción D</Form.Label>
                        <Form.Control name="opD" value={opD} onChange={this.handleChange} />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button variant="warning" onClick={this.guardar}>ACTUALIZAR</Button>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default Editar;
