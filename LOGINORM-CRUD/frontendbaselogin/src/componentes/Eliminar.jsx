import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

class Eliminar extends React.Component {
    state = {
        id: "",
        pregunta: "",
        deleted: false
    };

    componentDidMount() {
        const qId = new URLSearchParams(window.location.search).get("id");
        if (qId) {
            this.setState({ id: qId });
            axios.get("Pregunta?id=" + qId)
                .then(response => {
                    const q = response.data[0];
                    this.setState({ pregunta: q.pregunta || "" });
                })
                .catch(() => alert("Error al cargar el ejercicio"));
        }
    }

    eliminar = () => {
        const { id } = this.state;
        Swal.fire({
            title: '¿Eliminar este ejercicio?',
            text: this.state.pregunta,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33'
        }).then(result => {
            if (result.isConfirmed) {
                axios.delete("Pregunta?id=" + id)
                    .then(() => {
                        Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1200, showConfirmButton: false });
                        this.setState({ deleted: true });
                    })
                    .catch(() => {
                        Swal.fire({ icon: 'error', title: 'Error al eliminar' });
                    });
            }
        });
    };

    render() {
        if (this.state.deleted) return <Navigate to="/administrator" />;
        const { pregunta } = this.state;
        return (
            <Container className="mt-5 text-center" style={{ maxWidth: '500px' }}>
                <div className="alert alert-warning p-4" style={{ borderRadius: '12px' }}>
                    <h4>ELIMINAR PREGUNTA</h4>
                    <p className="mt-3"><strong>{pregunta}</strong></p>
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <Button variant="danger" onClick={this.eliminar}>ELIMINAR</Button>
                        <Button variant="secondary">
                            <Link to="/administrator" className="text-white text-decoration-none">CANCELAR</Link>
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Eliminar;
