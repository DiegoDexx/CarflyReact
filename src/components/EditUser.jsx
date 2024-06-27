import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenFromStorage, getUserIdFromStorage } from '../functions/storage';
import { getUserData } from '../functions/fetchData';

export const EditUser = ({ onClose, modalClass }) => {
  const [userData, setUserData] = useState({});
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [NIF, setNIF] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserData();
        setUserData(user);
        setName(user.name || "");
        setSurname(user.surname || "");
        setEmail(user.email || "");
        setNIF(user.NIF || "");
        setPhoneNumber(user.user_phone_number || "");
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getTokenFromStorage('authToken');
    const userId = getUserIdFromStorage('userId');

    try {
      const response = await axios.put(`http://localhost:8000/api/users/${userId}`, {
        name,
        surname,
        email,
        NIF,
        user_phone_number: phoneNumber,
        role: userData.role,
        // No se incluye la contraseña en la solicitud
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUserData(response.data.user);
        window.location.reload();
    
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error actualizando datos del usuario:', error);
        alert('Hubo un error al actualizar los datos');
      }
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
          <h4>Editar perfil</h4>{/*icono de lapiz de font awesome*/}<i className="fa fa-pencil" aria-hidden="true"></i>
          <style>
            {`
              .modal-top {

                background-color: #f8f9fa;
                color: white;
                display: flex;
                padding: 5px;
                border-bottom: 1px solid #e9ecef;
              }
                /* Agregar estilos para el icono de lapiz, que quede en flex */
                .fa-pencil {
                  font-size: 10px;
                  margin-left: 10px;
                  color: white;
                }
                  

           ` }
          </style>
        </div>
        <div className="modal-content">
          <form className="login-form" onSubmit={handleSubmit}>
            <fieldset className="form-group">
              <label htmlFor="name">Nombre</label>
              <input 
                type="text" 
                className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                id="name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Nombre"
                required 
              />
              {errors.name && <span className="text-danger">{errors.name}</span>}
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="surname">Apellido</label>
              <input 
                type="text" 
                className={`form-control ${errors.surname ? 'is-invalid' : ''}`} 
                id="surname"
                value={surname} 
                onChange={(e) => setSurname(e.target.value)} 
                placeholder="Apellido"
                required 
              />
              {errors.surname && <span className="text-danger">{errors.surname}</span>}
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                id="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email"
                required 
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="NIF">NIF</label>
              <input 
                type="text" 
                className={`form-control ${errors.NIF ? 'is-invalid' : ''}`} 
                id="NIF"
                value={NIF} 
                onChange={(e) => setNIF(e.target.value)} 
                placeholder="NIF"
                required 
                disabled
              />
              {errors.NIF && <span className="text-danger">{errors.NIF}</span>}
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="user_phone_number">Teléfono</label>
              <input 
                type="text" 
                className={`form-control ${errors.user_phone_number ? 'is-invalid' : ''}`} 
                id="user_phone_number"
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                placeholder="Teléfono"
                required 
              />
              {errors.user_phone_number && <span className="text-danger">{errors.user_phone_number}</span>}
            </fieldset>
            {/* No se incluye campo oculto para la contraseña */}
            <button className="btn btn-primary" type="submit">Guardar cambios</button>
          </form>
        </div>
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>
    </div>
  );
};

export default EditUser;
