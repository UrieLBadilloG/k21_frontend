import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      localStorage.setItem('token', data.token);
      onLogin(); 
      navigate('/upload');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div 
      className="container d-flex justify-content-center align-items-center" 
      style={{ minHeight: '100vh' }}
    >
      <div 
        className="card p-4 shadow-sm" 
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              placeholder="Ingresa tu correo"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              placeholder="Ingresa tu contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 mb-3"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
