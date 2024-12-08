import React, { useState, useCallback } from "react";
import { createUser } from "../services/api";

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const [message, setMessage] = useState("");

    const handleChange = useCallback(({ target: { name, value } }) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            const { name, email, password, role } = formData;

            if (!name || !email || !password) {
                setMessage("Por favor, completa todos los campos.");
                return;
            }

            try {
                await createUser({ name, email, password, role });
                setMessage("Usuario creado exitosamente.");
                setFormData({ name: "", email: "", password: "", role: "user" });
            } catch (error) {
                console.error("Error al crear usuario:", error);
                setMessage("Error al crear usuario. Por favor, inténtalo de nuevo.");
            }
        },
        [formData]
    );

    return (
        <div className="container mt-5">
            <h2>Crear Usuario</h2>
            {message && <div className="alert alert-info mt-3">{message}</div>}
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ingresa el nombre"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ingresa el correo electrónico"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Ingresa la contraseña"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Rol</label>
                    <select
                        id="role"
                        name="role"
                        className="form-select"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Crear Usuario
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
