
# Proyecto Frontend React

## Pasos para Configurar el Proyecto desde GitHub

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO_FRONTEND>
cd <NOMBRE_DEL_REPOSITORIO>
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```
REACT_APP_API_BASE_URL=http://localhost:8000/api
```

Asegúrate de que la URL base apunte al backend en ejecución.

### 4. Iniciar el servidor de desarrollo

```bash
npm start
```

Esto iniciará el servidor local en `http://localhost:3000`.

---

## Componentes del Proyecto

### 1. **Login**
- **Ruta**: `/`
- **Descripción**: Permite que los usuarios inicien sesión en la aplicación.
- **Comportamiento**:
  - Si el usuario tiene el rol de `admin`, redirige a la página de carga masiva.
  - Si el usuario tiene el rol de `user`, redirige a la tabla de usuarios.

### 2. **Carga Masiva**
- **Ruta**: `/upload`
- **Descripción**: Permite a los administradores cargar un archivo Excel y enviarlo al backend.
- **Funcionalidad**:
  - Validación para permitir solo archivos Excel (`.xlsx`).
  - Feedback visual en caso de éxito o error.
  - Solo accesible para usuarios con rol de `admin`.

### 3. **Tabla de Usuarios**
- **Ruta**: `/users`
- **Descripción**: Muestra una tabla paginada con la lista de usuarios.
- **Funcionalidad**:
  - Permite navegar por la lista de usuarios utilizando botones de paginación.
  - Incluye un modal para ver detalles de un usuario seleccionado (teléfonos y direcciones).

---

## Rutas del Proyecto

### 1. **Login (`/`)**
- **Descripción**: Punto de entrada a la aplicación.
- **Requiere autenticación**: No.
- **Componente principal**: `Login`.

### 2. **Carga Masiva (`/upload`)**
- **Descripción**: Página para cargar un archivo Excel.
- **Requiere autenticación**: Sí (solo para administradores).
- **Componente principal**: `UploadExcel`.

### 3. **Tabla de Usuarios (`/users`)**
- **Descripción**: Página que muestra la lista de usuarios.
- **Requiere autenticación**: Sí.
- **Componente principal**: `UsersTable`.

---

