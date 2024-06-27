import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getTokenFromStorage, getUserIdFromStorage } from '../../functions/storage';

export const CreateBookingComponent = ({ onCloseCreate, vehicleId }) => {
  const [usersId, setUsersId] = useState('');
  const [vehicleData, setVehicleData] = useState('');
  const [bookingType, setBookingType] = useState('');
  const [startBookingDate, setStartBookingDate] = useState('');
  const [endingBookingDate, setEndingBookingDate] = useState('');
  const [bookingState, setBookingState] = useState('booked');
  const [bookingPrice, setBookingPrice] = useState(0);
  const [errors, setErrors] = useState({});
  const userId = getUserIdFromStorage("userId");
  const token = getTokenFromStorage("authToken");

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/vehicles/${vehicleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setVehicleData(response.data.vehicle);
        }
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };

    fetchVehicleData();
  }, [vehicleId, token]);

  const changeVehicleState = async (vehicleId) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/vehicles/${vehicleId}`, {
        vehicle_state: 'booked',
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log('Vehicle state changed to booked');
      }
    } catch (error) {
      console.error('Error changing vehicle state:', error);
    }
  };

  const calculateBookingPrice = (vehicle) => {
    const startDate = new Date(startBookingDate);
    const endDate = new Date(endingBookingDate);
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const pricePerDay = vehicle.booking_price || 15; // Use 0 if booking_price is not defined
    const price= differenceInDays * pricePerDay;
    return price;
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
  
    const price = calculateBookingPrice(vehicleData);
    setBookingPrice(price);
  
    if (window.confirm(`Desea pagar el monto ${price}€ por la reserva?`)) {
      const bookingData = {
        users_id: userId,
        vehicle_id: vehicleId,
        booking_type: bookingType,
        start_booking_date: startBookingDate,
        ending_booking_date: endingBookingDate,
        booking_state: bookingState,
        booking_price: price,
      };
  
      try {
        const response = await axios.post('http://localhost:8000/api/car_booking', bookingData, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
  
        if (response.status === 200) {
          await changeVehicleState(vehicleId);
          window.location.href = `/`;
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error('Error creating booking:', error);
        }
      }
    } else {
      onCloseCreate();
    }
  };

  return (
<div className="modal-edit">
        <style>
            {`
                .error-message {
                    color: red;
                    margin-top: 10px;
                    font-size: 12px;
                }
a
                label{
                    color: black;
                    font-size: 12px; !important
                }
            `}
        </style>


    <div className="modal-inner">
      <div className="modal-top">
        <h4>Registrar Reserva</h4>
      </div>
      <div className="modal-content">
        <form className="login-form" onSubmit={handleCreateBooking}>
         
            <input 
              type="hidden" 
              id="users_id" 
              value={userId} 
              onChange={e => setUsersId(e.target.value)} 
              required 
              className={`form-control ${errors.users_id ? 'is-invalid' : ''}`} 
            />
      
            <input 
              type="hidden" 
              id="vehicle_id" 
              value={vehicleId} 
              onChange={e => setVehicleId(e.target.value)} 
              required 
              className={`form-control ${errors.vehicle_id ? 'is-invalid' : ''}`} 
            />
           
          
          <fieldset className="form-group">
            <label htmlFor="bookingType">Tipo de Reserva</label>
            <select 
              id="bookingType" 
              value={bookingType} 
              onChange={e => setBookingType(e.target.value)} 
              required
              className={`form-control ${errors.booking_type ? 'is-invalid' : ''}`}
            >
              <option value="daily">Básico(Sin lavado, tanque a mitad)</option>
              <option value="weekly">Plus(Lavado, tanque lleno)</option>
            </select>
            {errors.booking_type && <span className="error-message">{errors.booking_type}</span>}
          </fieldset>

          <fieldset className="form-group">
            <label htmlFor="startBookingDate">Fecha de Inicio</label>
            <input 
              type="date" 
              id="startBookingDate" 
              value={startBookingDate} 
              onChange={e => setStartBookingDate(e.target.value)} 
              required 
              className={`form-control ${errors.start_booking_date ? 'is-invalid' : ''}`} 
            />
            {errors.start_booking_date && <span className="error-message">{errors.start_booking_date}</span>}
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="endingBookingDate">Fecha de Fin</label>
            <input 
              type="date" 
              id="endingBookingDate" 
              value={endingBookingDate} 
              onChange={e => setEndingBookingDate(e.target.value)} 
              required 
              className={`form-control ${errors.ending_booking_date ? 'is-invalid' : ''}`} 
            />
            {errors.ending_booking_date && <span className="error-message">{errors.ending_booking_date}</span>}
          </fieldset>
            {/**Pasar por hidden el estado de la reserva en booked */}
            <input type="hidden" name="bookingState" value={bookingState} />

          <fieldset className="form-group">
            {/* <label htmlFor="booking_price">Precio de la Reserva (€)</label> */}
            <input 
              type="hidden" 
              id="booking_price" 
              value={bookingPrice} 
              onChange={e => setBookingPrice(e.target.value)} 
              readOnly
              required 
              className={`form-control ${errors.booking_price ? 'is-invalid' : ''}`}
            />
            {errors.booking_price && <span className="error-message">{errors.booking_price}</span>}
          </fieldset>
          <button type="submit" className='btn btn-primary'>Reservar y pagar</button>
        </form>
      </div>
      <button onClick={onCloseCreate} className='close-button'>Cerrar</button>
    </div>
    </div>
  );
};

