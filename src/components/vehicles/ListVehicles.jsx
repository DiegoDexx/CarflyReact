import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenFromStorage } from '../../functions/storage';
import { RegisterVehicle } from './RegisterVehicle';
import { EditVehicle } from './EditVehicle';

export const ListVehicles = ({ openModalCreate, companyid, onClose }) => {
    const [vehicles, setVehicles] = useState([]);
    const [errors, setErrors] = useState(null);
    const [openCreateVehicle, setOpenCreateVehicle] = useState(false); // Estado para el modal de crear vehículo
    const [currentCompanyId, setCurrentCompanyId] = useState(null); // Para pasar el ID de la compañía al modal
    const [openEditVehicle, setOpenEditVehicle] = useState(false); // Estado para el modal de editar vehículo
    const [currentVehicleId, setCurrentVehicleId] = useState(null); // Para pasar el ID del vehículo al modal

    const handleOpenCreateVehicle = (companyId) => {
        setCurrentCompanyId(companyId);
        setOpenCreateVehicle(true);
    };

    const handleCloseCreateVehicle = () => {
        setOpenCreateVehicle(false);
        setCurrentCompanyId(null);
    };

    const handleOpenEditVehicle = (vehicleId) => {
        setCurrentVehicleId(vehicleId);
        setOpenEditVehicle(true);
    };

    const handleCloseEditVehicle = () => {
        setOpenEditVehicle(false);
        setCurrentVehicleId(null);
    };

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const token = getTokenFromStorage('authToken');
                const response = await axios.get(`http://localhost:8000/api/company/${companyid}/vehicles`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
                setErrors(error.response ? error.response.data : 'Error fetching vehicles');
            }
        };

        fetchVehicles();
    }, [companyid]);

    const handleDelete = async (vehicleId) => {
        try {
            const token = getTokenFromStorage('authToken');
            
            // Check if the vehicle is associated with any booking
            const bookingResponse = await axios.get(`http://localhost:8000/api/vehicles/${vehicleId}/bookings`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (bookingResponse.data.length > 0) {
                onClose();
                setErrors('No se puede eliminar el vehículo porque está asociado a una reserva.');
                alert('No se puede eliminar el vehículo porque está asociado a una reserva.');
                window.location.href="/profile"
                return;
            }

            await axios.delete(`http://localhost:8000/api/vehicles/${vehicleId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            setErrors(error.response ? error.response.data : 'Error deleting vehicle');
            alert('No se puede eliminar el vehículo,  está asociado a una reserva.');
            window.location.href="/profile"
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">Vehículos</h5>
                    <button className="btn btn-primary" onClick={handleOpenCreateVehicle}>Añadir</button>
                    <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                </div>
                {errors && <div className="alert alert-danger">{errors}</div>}
                <table className="table table-responsive mt-3 ">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Matrícula</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.length > 0 ? (
                            vehicles.map(vehicle => (
                                <tr key={vehicle.id}>
                                    <td data-label="Id del vehículo">{vehicle.id}</td>
                                    <td data-label="Marca y modelo">{[vehicle.brand," ",vehicle.model]}</td>
                                    <td data-label="Matñicula">{vehicle.license_plate}</td>
                                    <td data-label="Estado">{vehicle.vehicle_state}</td>
                                    <td className='actions'>
                                    <div className="d-flex align-items-center justify-content-center flex-row p-1">
                                        <button className="btn btn-primary btn-sm" onClick={() => handleOpenEditVehicle(vehicle.id)}>Editar</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(vehicle.id)}>Eliminar</button>
                                    </div>    
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No hay vehículos registrados.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {openCreateVehicle && <RegisterVehicle companyId={companyid} onCloseCreate={handleCloseCreateVehicle} />}
                {openEditVehicle && <EditVehicle companyId={companyid} onCloseEdit={handleCloseEditVehicle} vehicleId={currentVehicleId} />}
            </div>
        </div>
    );
};
