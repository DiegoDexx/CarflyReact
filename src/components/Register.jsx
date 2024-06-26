import React, { useState } from 'react';

const Register = ({ onClose, modalClass, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    NIF: '',
    user_phone_number: '',
    role: 'cliente',
    // Otros campos si es necesario
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token;
        localStorage.setItem('token', token);
        console.log('Registro exitoso', responseData);
        // Mostrar pantalla de login
        onRegisterSuccess();
        

      } else {
        console.log("Respuesta del servidor:", response);
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors(errorData.errors);
        } else {
          alert('Error desconocido');
        }
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className={modalClass}>
  <style>
    {`
      .error-message {
        color: red;
        margin-top: 10px;
      }
    `}
  </style>
  <div className="modal-inner">
    <div className="modal-top">
      <i className="material-icons">edit</i>
      <br />
      <h4>Registrarse</h4>
    </div>
    <div className="modal-content">
      <form onSubmit={handleSubmit} className="login-form">
        <fieldset className="form-group">
          <label htmlFor="name" className="required">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Ingrese el nombre del usuario"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="text-danger">{errors.name}</span>}
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="surname" className="required">Apellidos</label>
          <input
            type="text"
            name="surname"
            id="surname"
            className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
            placeholder="Ingrese los apellidos del usuario"
            value={formData.surname}
            onChange={handleChange}
            required
          />
          {errors.surname && <span className="text-danger">{errors.surname}</span>}
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="NIF" className="required">NIF</label>
          <input
            type="text"
            name="NIF"
            id="NIF"
            className={`form-control ${errors.NIF ? 'is-invalid' : ''}`}
            placeholder="Ingrese el NIF del usuario"
            value={formData.NIF}
            onChange={handleChange}
            required
          />
          {errors.NIF && <span className="text-danger">{errors.NIF}</span>}
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="email" className="required">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Ingrese el email del usuario"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="password" className="required">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Ingrese la contraseña del usuario"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="text-danger">{errors.password}</span>}
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="user_phone_number" className="required">Número de teléfono</label>
          <input
            type="text"
            name="user_phone_number"
            id="user_phone_number"
            className={`form-control ${errors.user_phone_number ? 'is-invalid' : ''}`}
            placeholder="Ingrese el número de teléfono del usuario"
            value={formData.user_phone_number}
            onChange={handleChange}
            required
          />
          {errors.user_phone_number && <span className="text-danger">{errors.user_phone_number}</span>}
        </fieldset>
        {/* Rol con valor cliente que será asignado por defecto */}
        <input 
          type="hidden" 
          name="role" 
          id="role"
          value={formData.role}
          onChange={handleChange}
        />

        {/* Otros campos si es necesario */}
        <button className="btn btn-primary" type="submit">Registrarse</button>
      </form> 
      <button onClick={onClose} className="close-button">Cerrar</button>
    </div>
  </div>
</div>
  );
};

export default Register;
