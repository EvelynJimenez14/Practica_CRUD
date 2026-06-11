import React from "react";
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./Login.jsx";
import Administrator from "./Administrator.jsx";
import NotRegistered from "./NotRegistered.jsx";
import Info from "./Info.jsx";
import Formulario from "./Formulario.jsx";
import Editar from "./Editar.jsx";
import Eliminar from "./Eliminar.jsx";

class BootstrapReact extends React.Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path="/"              element={<Login />} />
                    <Route path="/administrator" element={<Administrator />} />
                    <Route path="/notregistered" element={<NotRegistered />} />
                    <Route path="/info"          element={<Info />} />
                    <Route path="/formulario"    element={<Formulario />} />
                    <Route path="/editar"        element={<Editar />} />
                    <Route path="/eliminar"      element={<Eliminar />} />
                </Routes>
            </div>
        );
    }
}

export default BootstrapReact;
