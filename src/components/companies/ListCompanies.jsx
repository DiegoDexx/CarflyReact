import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { ListVehicles } from '../vehicles/ListVehicles';
import { getTokenFromStorage, getUserIdFromStorage } from '../../functions/storage';

export const ListCompanies = ({ openModal }) => {
    const [companies, setCompanies] = useState([]);
    const [users, setUsersData] = useState([]);
    const { isAuthenticated } = useAuth();
    const token = getTokenFromStorage('authToken');
    const userId = getUserIdFromStorage('userId');
    const [selectedCompanyId, setSelectedCompanyId] = useState (null);
    const [openTable, setOpenTable] = useState(false);

    const handleOpenTable = (companyId) => {
        setSelectedCompanyId(companyId);
        setOpenTable(true);
    }

    const handleCloseTable = async () => {
        setOpenTable(false);
    }

    const [EditModalOpen, setOpenModal] = useState(false);
    const [openCreateVehicle, setOpenCreateVehicle] = useState  (false);
    
    const handleOpenCreateVehicle = () => {
      setOpenCreateVehicle(true);
    }
  
    const handleCloseCreateVehicle = () => {
      setOpenCreateVehicle(false);
    
    }



    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                if (isAuthenticated) {
                    const token = getTokenFromStorage('authToken');
                    const userId = getUserIdFromStorage('userId');

                    const response = await axios.get(`http://localhost:8000/api/user/${userId}/companies`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setCompanies(response.data);
                }

                  //get user Data in array of companies

                const usersIds = [...new Set(companies.map(company => company.user_id))];
                const usersRequests = usersIds.map(id =>
                    axios.get(`http://localhost:8000/api/users/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                );
                    const usersResponses = await Promise.all(usersRequests);
                    const usersData = {};
                    usersResponses.forEach(response => {
                        const user = response.data;
                        usersData[user.id] = user;
                    });
            
                    setUsersData(usersData);


            } catch (error) {
                console.error('Error fetching companies:', error);
            }
            
            };

        fetchCompanies();
    }, [isAuthenticated]);

    const handleDeleteCompany = async (companyId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar tu Compañía? Esta acción no se puede deshacer.');

        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/api/companies/${companyId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCompanies(companies.filter(company => company.id !== companyId));
            } catch (error) {
                console.error('Error deleting company:', error);
            }
        }

    };


    return (
        <>
     <table className="table table-responsive mt-3">
  <thead className="table-dark">
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Ciudad</th>
      <th scope="col">Dueño</th>
      <th scope="col">Teléfono</th>
      <th scope="col">Dirección</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {companies.length > 0 ? (
      companies.map(company => (
        <tr key={company.id}>
          <td data-label="Nombre">{company.company_name}</td>
          <td data-label="Ciudad">{company.company_city}</td>
          <td data-label="Dueño">
            {users[company.user_id]
              ? `${users[company.user_id].name} ${users[company.user_id].surname}`
              : 'Cargando...'}
          </td>
          <td data-label="Teléfono">{company.company_phone_number}</td>
          <td data-label="Dirección">{company.company_address}</td>
          <td data-label="Acciones " className="actions">{/**Espacio en blanco */}{""}  
            <div className="d-flex align-items-center justify-content-center flex-row p-1">
              <button
                className="btn btn-primary btn-sm m-2"
                onClick={() => openModal(company.id)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm m-2"
                onClick={() => handleDeleteCompany(company.id)}
              >
                Eliminar
              </button>
              <button
                className="btn btn-primary btn-sm m-2"
                onClick={() => handleOpenTable(company.id)}
              >
                Ver Vehículos
              </button>
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6">Sin compañías</td>
      </tr>
    )}
  </tbody>
</table>


               { openTable && <ListVehicles 
               companyid={selectedCompanyId} 
               openTable={handleOpenTable} 
               onClose={handleCloseTable} 
               openModalCreate={handleOpenCreateVehicle}
        /> }
        </>
    );
};
