import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTokenFromStorage, getUserIdFromStorage } from '../functions/storage';
import { CreateBookingComponent } from './bookings/CreateBooking';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [results, setResults] = useState({ vehicles: [] });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Estado de inicio de sesión inicializado como falso
  const [bookingModalIsOpen, setBookingModalIsOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null); // Estado para almacenar el ID del vehículo seleccionado

  const token = getTokenFromStorage("authToken");
  const userId = getUserIdFromStorage("userId");

  const cities = [
    "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza",
    "Málaga", "Murcia", "Palma", "Las Palmas", "Bilbao",
    "Alicante", "Córdoba", "Valladolid", "Vigo", "Gijón",
    "Elche", "Granada", "Tarragona", "Oviedo", "Cartagena", "Lima",
    "Bogotá", "Quito", "Guayaquil", "Cali", "Medellín", "Santiago",
    "Buenos Aires", "Rosario", "Córdoba", "Mendoza", "Tucumán",
  ];

  useEffect(() => {
    handleLogin();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/search', {
        params: { query, city },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResults(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLogin = () => {
    if (userId === null || token === null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
    console.log('Logueado?:', loggedIn);
  };

  const handleBookingModal = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setBookingModalIsOpen(true);
    closeModal();
  }

  const handleBookingModalClose = () => {
    setBookingModalIsOpen(false);
  }

  const handleToLogin = () => {
    window.location.href = '/login';
  }

  return ( 
    <div className="container-banner">
      <div className="banner">
        <div className="banner__content text-center">
          <div className="banner__img mb-4">
            <img src="./src/assets/img/blue_car_background.jpg" alt="Car Park" className="img-fluid"/>
          </div>
          <style>
            {`
              .search-input {
                width: 200px;
                margin-right: 10px;
              }

              .search-select {
                width: 150px;
                margin-right: 10px;
                font-size: 18px;
              }

              .search-select option {
                font-weight: bold;
                color: #000000; /* Text color */
              }

              .card-footer button {
                width: 100%;
              }
            `}
          </style>
          <div className="text-content">
            <h1 className="banner__title">¿Quieres viajar sin preocupación?</h1>
            <h3 className="banner__description">Alquila y aparca al mejor precio!</h3>
            <div className="searchBar mt-4">
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control search-input"
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                  placeholder="Buscar por marca de coche"
                />
                <select 
                  className="custom-select search-select" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">Seleccionar ciudad</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
                <div className="input-group-append">
                  {!loggedIn && <button className="btn btn-primary search-button" onClick={handleToLogin}>Buscar</button>}
                  {loggedIn && <button className="btn btn-primary search-button" onClick={handleSearch}>Buscar</button>}
                </div>
              </div>
            </div>
            <Modal show={modalIsOpen} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Resultados de la búsqueda</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {results.vehicles.map(vehicle => (
                  <Card key={vehicle.id} className="mb-3">
                    <Card.Body>
                      <Card.Title>{vehicle.brand} - {vehicle.model}</Card.Title>
                      <Card.Text>
                        Precio: {vehicle.booking_price} €
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      {loggedIn && <Button variant="primary" block onClick={() => handleBookingModal(vehicle.id)}>Reservar</Button>}
                    </Card.Footer>
                  </Card>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
            {bookingModalIsOpen && <CreateBookingComponent vehicleId={selectedVehicleId} onCloseCreate={handleBookingModalClose} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
