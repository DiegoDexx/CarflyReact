import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { ListVehicles } from '../vehicles/ListVehicles';
import { getTokenFromStorage, getUserIdFromStorage } from '../../functions/storage';

export const ListCarBookings = ({ openModal }) => {
    const [bookings, setBookings] = useState([]);
    const [vehicles, setVehicles] = useState({});
    const { isAuthenticated } = useAuth();
    const token = getTokenFromStorage('authToken');
    const userId = getUserIdFromStorage('userId');
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [openTable, setOpenTable] = useState(false);

    const handleOpenTable = (bookingId) => {
        setSelectedBookingId(bookingId);
        setOpenTable(true);
    };

    const handleCloseTable = async () => {
        setOpenTable(false);
    };

    const [EditModalOpen, setOpenModal] = useState(false);
    const [openCreateVehicle, setOpenCreateVehicle] = useState(false);

    const handleOpenCreateVehicle = () => {
        setOpenCreateVehicle(true);
    };

    const handleCloseCreateVehicle = () => {
        setOpenCreateVehicle(false);
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                if (isAuthenticated) {
                    const response = await axios.get(`http://localhost:8000/api/user/${userId}/car_bookings`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const bookingsData = response.data;
                    setBookings(bookingsData);

                    // Fetch vehicle information for each booking
                    const vehicleIds = [...new Set(bookingsData.map(booking => booking.vehicle_id))];
                    const vehicleRequests = vehicleIds.map(id =>
                        axios.get(`http://localhost:8000/api/vehicles/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                    );
                    const vehicleResponses = await Promise.all(vehicleRequests);
                    const vehiclesData = {};
                    vehicleResponses.forEach(response => {
                        const vehicle = response.data;
                        vehiclesData[vehicle.id] = vehicle;
                    });

                    setVehicles(vehiclesData);
                }
            } catch (error) {
                console.error('Error fetching car bookings:', error);
            }
        };

        fetchBookings();
    }, [isAuthenticated]);

    const handleDeleteBooking = async (bookingId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta reserva? Esta acción no se puede deshacer.');

        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/api/car_booking/${bookingId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBookings(bookings.filter(booking => booking.id !== bookingId));
            } catch (error) {
                console.error('Error deleting car booking:', error);
            }
        }
    };

    return (
        <>
            <h4>Mis reservas</h4>
            <table className="table mt-3">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Vehículo</th>
                        <th scope="col">Fecha de Inicio</th>
                        <th scope="col">Fecha de Fin</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Precio (€)</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map(booking => (
                            <tr key={booking.id}>
                                <td data-label="Vehículo">{vehicles[booking.vehicle_id] ? [vehicles[booking.vehicle_id].brand, " ",vehicles[booking.vehicle_id].model] : 'Cargando...'}</td>
                   
                                <td data-label="Fecha de inicio">{booking.start_booking_date}</td>
                                <td data-label="Fecha de fin">{booking.ending_booking_date}</td>
                                <td data-label="Fecha de inicio">{booking.booking_state}</td>
                                <td data-label="Precio pagado">{booking.booking_price}</td>
                                <td>
                                    <div className="d-flex align-items-center p-2">
                                        <button className="btn btn-danger btn-sm m-2" onClick={() => handleDeleteBooking(booking.id)}>Anular</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">Sin reservas</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};
