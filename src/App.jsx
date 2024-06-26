import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SearchBanner from './components/SearchBanner';
import HeaderHomePage from './components/HeaderHomePage';
import { MyProfile } from './components/UserPanel';
import EditUser from './components/EditUser';
import Login from './components/Login';
import Register from './components/Register';
import RegisterCompany from './components/companies/RegisterCompany';
import { AuthProvider } from './contexts/AuthContext';
import { RestPage } from './components/RestPageDesign';



const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showSearchBanner, setShowSearchBanner] = useState(true); // State to control whether to show SearchBanner
  const [showRegisterCompanyModal, setShowRegisterCompanyModal] = useState(false);





  useEffect(() => {
    if (location.pathname === '/login') {
      setLoginVisible(true);
      setRegisterVisible(false);
    } else if (location.pathname === '/register') {
      setLoginVisible(false);
      setRegisterVisible(true);
    } else {
      setLoginVisible(false);
      setRegisterVisible(false);
    }

    // Check if the current route is '/profile', if yes, hide the SearchBanner
    setShowSearchBanner(location.pathname !== '/profile');
  }, [location]);

  const toggleLoginModal = () => {
    setLoginVisible(!isLoginVisible);
    setRegisterVisible(false);
  };

  const toggleRegisterSuccess = () => {
    setRegisterVisible(false);
    navigate('/login');
    setLoginVisible(true);
  };

  const handleCloseRegisterModal = () => {
    setRegisterVisible(false);
  };

  const handleCloseLoginModal = () => {
    setLoginVisible(false);
  };

  const handleEditAccount = () => {
    setShowEditModal(true); // Mostrar el modal de edición al hacer clic en el botón "Editar"
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false); // Cerrar el modal de edición
  };

  //register company modals
const handleRegisterCompany = () => {
  setShowRegisterCompanyModal(true);
}

const handleCloseRegisterCompanyModal = () => {
  setShowRegisterCompanyModal(false);
}




  let $modalClass = isRegisterVisible ? 'myModal' : 'modal-hidden';
  let $LoginModalClass = isLoginVisible ? 'login-modal' : 'modal-hidden';
  let $EditUsermodalClass = showEditModal ? 'modal-edit' : 'modal-hidden';
  let $RegisterCompanymodalClass = showRegisterCompanyModal ? 'modal-registerCompany' : 'modal-hidden';

  return (
    <>
      <AuthProvider>
        <HeaderHomePage />
        {showSearchBanner && <SearchBanner />} {/* Conditionally render SearchBanner */}
        {showSearchBanner && <RestPage />} {/* Conditionally render RestPage */}
        <Routes>
          <Route path="/login" element={<Login onClose={toggleLoginModal} modalClass={$LoginModalClass} />} />
          <Route path="/register" element={<Register onClose={handleCloseRegisterModal} modalClass={$modalClass} onRegisterSuccess={toggleRegisterSuccess} />} />
          <Route path="/profile" element={
            <>
              <MyProfile openModal={handleEditAccount} openCreateCompany={handleRegisterCompany} />
              {showEditModal && <EditUser onClose={handleCloseEditModal} modalClass={$EditUsermodalClass} />}
               {/* Register Company Modal */}
               {showRegisterCompanyModal && <RegisterCompany onClose={handleCloseRegisterCompanyModal} modalClass={$RegisterCompanymodalClass } />}
               
            </>
          } />
          {/* Otras rutas pueden ir aquí */}
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
