import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UploadExcel from "./components/UploadExcel";
import UsersTable from "./components/UsersTable";
import Navbar from "./components/Navbar";
import CreateUser from "./components/CreateUser"; 
import API from "./services/api";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchUserRole();
    }
  }, []);

  const fetchUserRole = async () => {
    try {
      const response = await API.get("/user"); 
      setRole(response.data.role);
    } catch (error) {
      console.error("Error al obtener el rol del usuario:", error);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    fetchUserRole();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole("");
    localStorage.removeItem("token");
  };

  return (
    <Router>
      {isAuthenticated && <Navbar role={role} onLogout={handleLogout} />}
      <Routes>
        {/* Ruta de Login */}
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : role === "admin" ? (
              <Navigate to="/upload" />
            ) : (
              <Navigate to="/users" />
            )
          }
        />

        {/* Ruta de Upload - Solo para admin */}
        {role === "admin" && (
          <Route
            path="/upload"
            element={isAuthenticated ? <UploadExcel /> : <Navigate to="/" />}
          />
        )}

        {/* Ruta de Crear Usuario - Solo para admin */}
        {role === "admin" && (
          <Route
            path="/create-user"
            element={isAuthenticated ? <CreateUser /> : <Navigate to="/" />}
          />
        )}

        {/* Ruta de Usuarios - Disponible para todos */}
        {isAuthenticated && (
          <Route
            path="/users"
            element={<UsersTable role={role} onLogout={handleLogout} />}
          />
        )}

        {/* Ruta para cualquier otra dirección */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              role === "admin" ? (
                <Navigate to="/upload" />
              ) : (
                <Navigate to="/users" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
