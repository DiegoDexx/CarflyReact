import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { getTokenFromStorage, getUserIdFromStorage } from '../functions/storage';
import { Link } from 'react-router-dom';
import { ListCompanies } from './companies/ListCompanies';
import { EditCompany } from './companies/EditCompany';
import { RegisterVehicle } from './vehicles/RegisterVehicle';
import { ListVehicles } from './vehicles/ListVehicles';
import { ListCarBookings } from './bookings/ListBookings';

// Asegúrate de importar EditCompany si aún no lo has hecho

export const MyProfile = ({ openModal, openCreateCompany }) => {
  const [userData, setUserData] = useState(null);
  const { isAuthenticated } = useAuth();
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const [currentCompanyId, setCurrentCompanyId] = useState(null); // Para pasar el ID de la compañía al modal
  const [EditModalOpen, setOpenModal] = useState(false); // Estado para el modal de edición


  const setIsModalOpenEditCompany = (companyId) => {
    setSelectedCompanyId(companyId);
    setOpenModal(true); // Abre el modal de edición
  };

  const handleCloseEditCompanyModal = () => {
    setOpenModal(false); // Cierra el modal de edición
    setSelectedCompanyId(null);
  };



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated) {
          const token = getTokenFromStorage('authToken');
          const userId = getUserIdFromStorage('userId');

          const response = await axios.get(`http://localhost:8000/api/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  const handleDeleteAccount = async () => {
    const token = getTokenFromStorage('authToken');
    const userId = getUserIdFromStorage('userId');

    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        window.location.href = '/login';
      } catch (error) {
        console.error('Error eliminando cuenta:', error);
      }
    }
  };

  return (
    <div className="row">
      <h3>Panel de Usuario</h3>
      <style>
        {`
          h3 {
            text-align: center;
          }
          .edit-button {
            cursor: pointer;
          }
          .edit-button:hover {
            color: blue;
          }
        `}
      </style>
      <div className="col-lg-4">
        {userData ? (
          <div className="card mb-4">
            <div className="card-body text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: '150px' }}
              />
              <h5 className="my-3">{userData.name} {userData.surname}</h5>
              <p className="text-muted mb-1">{userData.role}</p>
              <p className="text-muted mb-4">{userData.email}</p>
              <div className="d-flex justify-content-center mb-2">
                <button className="btn btn-danger" onClick={handleDeleteAccount}>Eliminar mi cuenta</button>
              </div>
            </div>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      <div className="col-lg-8">
        {userData && (
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{userData.email}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Nombre completo</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{userData.name} {userData.surname}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">NIF</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{userData.NIF}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Teléfono</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{userData.user_phone_number}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <button className="edit-button" onClick={openModal}>Editar</button>
                </div>
                <div className="col-sm-9"></div>
              </div>
            </div>
          </div>
        )}
        {/* Sección Mis Compañías */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Mis compañías</h5>
              <button className="btn btn-primary" onClick={openCreateCompany}>Crear nueva</button>
            </div>
            {/* Renderizar ListCompanies con la función setIsModalOpenEditCompany */}
            <ListCompanies openModal={setIsModalOpenEditCompany} />
            {/* Mostrar EditCompany si selectedCompanyId tiene un valor */}
            {EditModalOpen && <EditCompany onClose={handleCloseEditCompanyModal} companyId={selectedCompanyId} />}

               {/* Sección Mis Reservas */}
            <ListCarBookings />
        
          </div>

       
        </div>
 
     
      </div>
    </div>
  );
};
