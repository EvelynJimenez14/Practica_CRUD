import React from "react";
import { Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import bgImg from '../pantalla.jpg';

class Login extends React.Component {
    constructor() {
        super();
        this.state = { condition: false, tipousuario: '', user: '', password: '' };
    }

    validar = () => {
        const { user, password } = this.state;
        fetch('Login?user=' + user + '&password=' + password)
            .then(response => response.json())
            .then(usuario => {
                if (usuario.status === "yes") {
                    if (usuario.tipo === "administrador") {
                        Swal.fire({
                            icon: 'success',
                            title: 'USUARIO VÁLIDO',
                            text: 'Bienvenido al sistema',
                            confirmButtonColor: '#0d6efd'
                        }).then(() => {
                            this.setState({ condition: true, tipousuario: 'administrador' });
                        });
                    }
                } else {
                    this.setState({ user: '', password: '' });
                    Swal.fire({
                        icon: 'error',
                        title: 'USUARIO NO VÁLIDO',
                        text: 'ID o contraseña incorrectos.',
                        confirmButtonColor: '#d33'
                    });
                }
            })
            .catch(() => {
                this.setState({ user: '', password: '' });
                Swal.fire({ icon: 'error', title: 'Error de conexión', confirmButtonColor: '#d33' });
            });
    };

    render() {
        const { condition, tipousuario, user, password } = this.state;

        if (condition && tipousuario === "administrador") return <Navigate to='/administrator' />;

        const bgStyle = {
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh'
        };

        const cardStyle = {
            backgroundColor: 'rgba(255,255,255,0.95)',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
        };

        return (
            <div style={bgStyle}>
                <div className="container-fluid p-5 bg-primary text-white text-center">
                    <h1>LOGIN-CRUD</h1>
                    <h5>Predicción de Demanda </h5>
                </div>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-sm-5">
                            <div style={cardStyle}>
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="user">ID</label>
                                    <input
                                        placeholder="Ingrese el ID"
                                        type="text"
                                        id="user"
                                        className="form-control"
                                        value={user}
                                        onChange={(e) => this.setState({ user: e.target.value })}
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label className="form-label" htmlFor="password">PASSWORD</label>
                                    <input
                                        placeholder="Ingrese su contraseña"
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => this.setState({ password: e.target.value })}
                                    />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-primary px-4" onClick={this.validar}>
                                        SUBMIT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
