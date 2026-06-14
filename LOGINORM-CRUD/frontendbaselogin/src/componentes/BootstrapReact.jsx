import React from "react";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./Login.jsx";
import Administrator from "./Administrator.jsx";
import NotRegistered from "./NotRegistered.jsx";
import Info from "./Info.jsx";
import Formulario from "./Formulario.jsx";
import Editar from "./Editar.jsx";
import Eliminar from "./Eliminar.jsx";
import Productos from "./Productos.jsx";
import NuevoProducto from "./NuevoProducto.jsx";

class BootstrapReact extends React.Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/administrator" element={<Administrator />} />
                <Route path="/notregistered" element={<NotRegistered />} />
                <Route path="/info" element={<Info />} />
                <Route path="/formulario" element={<Formulario />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/nuevo" element={<NuevoProducto />} />
                <Route path="/editar/:id" element={<Editar />} />
                <Route path="/eliminar/:id" element={<Eliminar />} />
            </Routes>
        );
    }
}
export default BootstrapReact;
