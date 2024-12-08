import React, { useEffect, useState, useCallback } from "react";
import { getUsers, getUserDetails } from "../services/api";
import { Modal, Button } from "react-bootstrap";

const UsersTable = ({ onLogout, role }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const sanitizeString = useCallback((str) => {
    return (str || "").replace(/\\r|\\n|\\|"/g, "").trim();
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await getUsers(page, pageSize);
      const sanitized = data.map((user) => ({
        ...user,
        nombre: sanitizeString(user.nombre),
        paterno: sanitizeString(user.paterno),
        materno: sanitizeString(user.materno),
      }));
      setUsers(sanitized);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      setUsers([]);
    }
  }, [page, pageSize, sanitizeString]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleShowDetails = useCallback(
    async (id) => {
      try {
        const { data } = await getUserDetails(id);
        if (data.length === 0) return;

        const [firstUser] = data;
        const sanitizedUser = {
          ...firstUser,
          nombre: sanitizeString(firstUser.nombre),
          paterno: sanitizeString(firstUser.paterno),
          materno: sanitizeString(firstUser.materno),
          telefonos: data.map((u) => sanitizeString(u.telefono)),
          direcciones: data.map((u) => ({
            calle: sanitizeString(u.calle),
            numero_exterior: sanitizeString(u.numero_exterior),
            numero_interior: sanitizeString(u.numero_interior),
            colonia: sanitizeString(u.colonia),
            cp: sanitizeString(u.cp),
          })),
        };

        setSelectedUser(sanitizedUser);
        setShowModal(true);
      } catch (error) {
        console.error("Error al obtener detalles del usuario:", error);
      }
    },
    [sanitizeString]
  );

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedUser(null);
  }, []);

  return (
    <div className="container mt-5">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-0">Lista de Usuarios</h2>
          <p className="text-muted mb-0">Rol actual: {role}</p>
        </div>
      </header>

      <div className="mb-3 w-25">
        <label htmlFor="pageSize" className="form-label">
          Usuarios por página:
        </label>
        <select
          id="pageSize"
          className="form-select"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          {[5, 10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th style={{ width: "150px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(({ persona_id, nombre, paterno }) => (
              <tr key={persona_id}>
                <td>{nombre}</td>
                <td>{paterno}</td>
                <td>
                  <Button variant="primary" onClick={() => handleShowDetails(persona_id)}>
                    Ver Detalles
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No hay usuarios disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between mb-4">
        <Button
          variant="secondary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </Button>
        <Button
          variant="secondary"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={users.length < pageSize}
        >
          Siguiente
        </Button>
      </div>

      {selectedUser && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Detalles del Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Nombre:</strong> {selectedUser.nombre}
            </p>
            <p>
              <strong>Apellido Paterno:</strong> {selectedUser.paterno}
            </p>
            <p>
              <strong>Apellido Materno:</strong> {selectedUser.materno}
            </p>

            <h5 className="mt-4">Teléfonos</h5>
            {selectedUser.telefonos?.length > 0 ? (
              <ul className="list-unstyled">
                {selectedUser.telefonos.map((tel, index) => (
                  <li key={`tel-${index}`}>{tel}</li>
                ))}
              </ul>
            ) : (
              <p>No hay teléfonos registrados.</p>
            )}

            <h5 className="mt-4">Direcciones</h5>
            {selectedUser.direcciones?.length > 0 ? (
              <ul className="list-unstyled">
                {selectedUser.direcciones.map((dir, index) => (
                  <li key={`dir-${index}`}>
                    {dir.calle}, {dir.numero_exterior} {dir.numero_interior},{" "}
                    {dir.colonia}, {dir.cp}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay direcciones registradas.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UsersTable;
