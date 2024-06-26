import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { saveItem } from '../functions/storage';
import { getUserInfo } from '../functions/saveUser';


const Login = ({ onClose, modalClass }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });

      if (response.data.token) {
        const authToken = response.data.token;
        saveItem('authToken', authToken);

        try {
          const userInfo = await getUserInfo(authToken);
          const userId = userInfo.userId;
          saveItem('userId', userId);
          login(authToken); // Pasa el token al contexto de autenticación
          onClose();
          const redirectUrl = response.data.redirect_url;

          COMPROBACIONES:
          // console.log('Token:', authToken);
          // console.log('User ID:', userId);
           console.log('User Info:', userInfo);
           console.log('Redirect URL:', redirectUrl);

          // Redirigir según la URL de redirección proporcionada por el backend
          
          window.location.href = redirectUrl;
        } catch (error) {
          console.error('Error obteniendo información del usuario:', error);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Error, credenciales incorrectas');
      } else {
        console.error('Error logging in:', error);
      }
    }
  };

  const redirectToRegister = () => {
    window.location.href = '/register';
  };

  return (
    <div className={modalClass}>
      <style>
        {`
          .error-message {
            color: red;
            margin-top: 10px;
            font-size: 12px;
            } 
                

              label{
                    color: black;
                    font-size: 12px;
                }
            `}
       
      </style>
      <div className="modal-inner">
        <div className="modal-top">
          <i className="material-icons">Bienvenido</i>
          <br />
          <h4>Inicia sesión</h4>
        </div>
        <div className="modal-content">
          <form className="login-form" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
            <fieldset className="form-group">
              <input 
                type="email" 
                className="form-control email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder='Introduce tu Email'
                required
              />
            </fieldset>
            <fieldset className="form-group">
              <input 
                type="password" 
                className="form-control password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder='Introduce tu contraseña'
                required 
              />
            </fieldset>
            {error && <div className="error-message">{error}</div>}
            <button className="btn btn-primary" type="submit">Submit</button>
            <span>
              <a href="#0" className="register-link" onClick={redirectToRegister}>
                Don't have an account?
              </a>
            </span>
          </form>
        </div>
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>
    </div>
  );
};

export default Login;
