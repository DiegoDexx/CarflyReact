// HeaderHomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../functions/logout';

const HeaderHomePage = ({ toggleLoginModal }) => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div className="carfly_landingpage">
      <header className="header-landing">
      <style>
          {`
            .nav-link {
              color: black;
              text-decoration: none;
              padding: 12px;
            }

            .nav-link:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          `}
        </style>
        <div className="topbar topbar--col-1-1">
          <input type="checkbox" id="menu-toggle2" />
          <label htmlFor="menu-toggle2" className="responsive-bar-icon2">
            <i className="fa fa-home" aria-hidden="true"></i>
          </label>
          <div className="logo">
            <img src="./src/assets/img/logo-no-background.png" className="logo__image" alt="Carfly Logo" />
          </div>
          <input type="checkbox" id="menu-toggle" />
          <label htmlFor="menu-toggle" className="responsive-bar-icon">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </label>
          <nav className="nav-bar">
            <ul className="nav-bar__list">
              <li className="nav-bar__item"><a href="/" className="nav-bar__link">Home</a></li>
              <li className="nav-bar__item"><a href="#" className="nav-bar__link">Novedades</a></li>
              <li className="nav-bar__item"><a href="#" className="nav-bar__link">Promociones</a></li>
              <li className="nav-bar__item"><a href="#" className="nav-bar__link">Acerca de</a></li>
            </ul>
          </nav>
          <nav className="user-options">
            <ul className="user-options__list">
              <li className="user-options__item">
                
                <span className="user-options__link" onClick={toggleLoginModal}>
                  {isAuthenticated ? (
                
                    <span onClick={logout} className="nav-link"> <i className="fa fa-sign-out" aria-hidden="true"></i> Cerrar sesión</span>
                  ) :  <Link to="/login" className='nav-link'><i className="fa fa-sign-in" aria-hidden="true"></i> Iniciar sesión </Link>}
                </span>
              </li>
              <li className="user-options__item">
                 
                    <span className="user-options__link" onClick={toggleLoginModal}>
                      {isAuthenticated ? ( 
                        <Link to="/profile" className='nav-link'><i className="fa fa-user" aria-hidden="true"></i>  Mi perfil</Link>
                      ) : <Link to="/register" className='nav-link'><i className="fa fa-id-badge" aria-hidden="true"></i> Registrarse</Link>}
                  </span>
              </li>
            </ul>
          </nav>
        </div>
      </header>
                      




    </div>
  );
};

export default HeaderHomePage;
