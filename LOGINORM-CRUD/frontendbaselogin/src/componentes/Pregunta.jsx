import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Pregunta = ({ id, pregunta }) => {
    return (
        <tr>
            <td>{pregunta}</td>
            <td className="text-center">
                <Button variant="success" className="me-2">
                    <Link to={`/info?id=${id}`} className="text-white text-decoration-none">
                        Ver
                    </Link>
                </Button>
                <Button variant="warning" className="me-2">
                    <Link to={`/editar?id=${id}`} className="text-white text-decoration-none">
                        Editar
                    </Link>
                </Button>
                <Button variant="danger">
                    <Link to={`/eliminar?id=${id}`} className="text-white text-decoration-none">
                        Eliminar
                    </Link>
                </Button>
            </td>
        </tr>
    );
};

export default Pregunta;
