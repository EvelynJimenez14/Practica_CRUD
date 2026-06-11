import React from "react";
import { Link } from "react-router-dom";

class NotRegistered extends React.Component {
    render() {
        return (
            <div style={{ textAlign: 'center', marginTop: '150px' }}>
                <h2>USUARIO NO REGISTRADO EN LA APLICACIÓN WEB.</h2>
                <br />
                <Link to="/">Regresar al Login</Link>
            </div>
        );
    }
}

export default NotRegistered;
