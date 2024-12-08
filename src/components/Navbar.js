import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ role, onLogout }) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">
                Cargas Masivas
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Mostrar/Ocultar navegación"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    {/* Todos los roles pueden ver Usuarios */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/users">
                            Usuarios
                        </Link>
                    </li>

                    {/* Solo admin puede subir archivo */}
                    {role === "admin" && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/upload">
                                Subir Archivo
                            </Link>
                        </li>
                    )}

                    {/* Solo admin puede crear usuario */}
                    {role === "admin" && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/create-user">
                                Crear Usuario
                            </Link>
                        </li>
                    )}
                </ul>
                <button type="button" className="btn btn-danger" onClick={onLogout}>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    </nav>
);

export default Navbar;
