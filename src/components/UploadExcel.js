import React, { useState, useCallback } from 'react';
import { uploadExcel } from '../services/api';

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Por favor selecciona un archivo');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadExcel(formData);
      setMessage('Archivo cargado exitosamente');
    } catch (err) {
      console.error('Error al cargar el archivo:', err);
      setMessage('Error al cargar el archivo');
    }
  }, [file]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Subir Archivo Excel</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input 
            type="file" 
            className="form-control" 
            onChange={handleFileChange} 
            accept=".xlsx,.xls" 
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={!file}
        >
          Subir Archivo
        </button>
      </form>
    </div>
  );
};

export default UploadExcel;
