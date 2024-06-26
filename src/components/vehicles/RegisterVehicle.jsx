import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenFromStorage, getUserIdFromStorage } from '../../functions/storage';

export const RegisterVehicle = ({ companyId, onCloseCreate }) => {
    const [companyOptions, setCompanyOptions] = useState([]);
    const [company_id, setCompanyId] = useState(companyId);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [image, setImage] = useState(null);
    const [year, setYear] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [ITVState, setITVState] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [bookingPrice, setBookingPrice] = useState('');
    const [vehicleState, setVehicleState] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const token = getTokenFromStorage('authToken');
                const userId = getUserIdFromStorage('userId');
                const response = await axios.get(`http://localhost:8000/api/user/${userId}/companies`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCompanyOptions(response.data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCompanies();
    }, []);

    const handleRegisterVehicle = async () => {
        try {
            const token = getTokenFromStorage('authToken');
            const userId = getUserIdFromStorage('userId');

            const formData = new FormData();
            formData.append('company_id', company_id);
            formData.append('brand', brand);
            formData.append('model', model);
            formData.append('image', image);
            formData.append('year', year);
            formData.append('fuel_type', fuelType);
            formData.append('ITV_state', ITVState);
            formData.append('license_plate', licensePlate);
            formData.append('booking_price', bookingPrice);
            formData.append('vehicle_state', vehicleState);

            const response = await axios.post(`http://localhost:8000/api/vehicles`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Vehicle registered:', response.data);
            setErrors({});
            // Clear form fields after successful registration
            setCompanyId('');
            setBrand('');
            setModel('');
            setImage(null);
            setYear('');
            setFuelType('');
            setITVState('');
            setLicensePlate('');
            setBookingPrice('');
            setVehicleState('');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error registering vehicle:', error);
            }
        }
    };

    return (
        <div className="modal-edit">
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
                    <h4>Registrar Vehículo</h4>
                </div>
                <div className="modal-content">
                    <form className="login-form" onSubmit={e => { e.preventDefault(); handleRegisterVehicle(); }}>
                         <fieldset className="form-group">
                            <label htmlFor="companyId">Compañía</label>
                            <select 
                                id="companyId" 
                                value={company_id} 
                                onChange={e => setCompanyId(e.target.value)} 
                                required
                                
                            >
                                <option value="">Seleccionar...</option>
                                {companyOptions.map(company => (
                                    <option key={company.id} value={company.id}>{company.company_name}</option>
                                ))}
                            </select>
                            {errors.company_id && <span className="error-message">{errors.company_id}</span>}
                        </fieldset>
                         <fieldset className="form-group">
                            <label htmlFor="brand">Marca</label>
                            <input 
                                type="text" 
                                id="brand" 
                                value={brand} 
                                onChange={e => setBrand(e.target.value)} 
                                required 
                                className={`form-control ${errors.brand ? 'is-invalid' : ''}`} 
                            />
                            {errors.brand && <span className="error-message">{errors.brand}</span>}
                        </fieldset>
                         <fieldset className="form-group">
                            <label htmlFor="model">Modelo</label>
                            <input 
                                type="text" 
                                id="model" 
                                value={model} 
                                onChange={e => setModel(e.target.value)} 
                                required 
                                className={`form-control ${errors.model ? 'is-invalid' : ''}`} 
                            />
                            {errors.model && <span className="error-message">{errors.model}</span>}
                        </fieldset>
                         <fieldset className="form-group">
                            <label htmlFor="image">Imagen</label>
                            <input 
                                type="file" 
                                id="image" 
                                onChange={e => setImage(e.target.files[0])} 
                                required 
                                className={`form-control ${errors.image_url ? 'is-invalid' : ''}`}
                            />
                            {errors.image_url && <span className="error-message">{errors.image_url}</span>}
                        </fieldset>
                         <fieldset className="form-group">
                            <label htmlFor="year">Año</label>
                            <input 
                                type="text" 
                                id="year" 
                                value={year} 
                                onChange={e => setYear(e.target.value)} 
                                required 
                                className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                            />
                            {errors.year && <span className="error-message">{errors.year}</span>}
                        </fieldset>
                         <fieldset className="form-group">
                            <label htmlFor="fuelType">Tipo de Combustible</label>
                            <select 
                                id="fuelType" 
                                value={fuelType} 
                                onChange={e => setFuelType(e.target.value)} 
                                required
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Gasolina">Gasolina</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Híbrido">Híbrido</option>
                                <option value="Eléctrico">Eléctrico</option>
                            </select>
                            {errors.fuel_type && <span className="error-message">{errors.fuel_type}</span>}
                        </fieldset>
                         <fieldset className="form-group">
                            <label htmlFor="ITVState">Estado ITV</label>
                            <select 
                                id="ITVState" 
                                value={ITVState} 
                                onChange={e => setITVState(e.target.value)} 
                                required
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Reservado">Valida</option>
                                <option value="Libre">No válida</option>
                            </select>
                            {errors.ITV_state && <span className="error-message">{errors.ITV_state}</span>}
                        </fieldset>
                         <fieldset className="form-group">
                            <label htmlFor="licensePlate">Matrícula</label>
                            <input 
                                type="text" 
                                id="licensePlate" 
                                value={licensePlate} 
                                onChange={e => setLicensePlate(e.target.value)} 
                                required 
                                className={`form-control ${errors.license_plate ? 'is-invalid' : ''}`}
                            />
                            {errors.license_plate && <span className="error-message">{errors.license_plate}</span>}
                        </fieldset>
                         <fieldset className="form-group">
                            <label htmlFor="bookingPrice">Precio de Reserva por día</label>
                            <input 
                                type="number" 
                                id="bookingPrice" 
                                value={bookingPrice} 
                                onChange={e => setBookingPrice(e.target.value)} 
                                placeholder='€'
                                required 
                                className={`form-control ${errors.booking_price ? 'is-invalid' : ''}`}
                            />
                            {errors.booking_price && <span className="error-message">{errors.booking_price}</span>}
                        </fieldset>
                         <fieldset className="form-group p-1">
                            <label htmlFor="vehicle_State">Estado del Vehículo</label>
                            <select 
                                id="vehicle_state" 
                                value={vehicleState} 
                                onChange={e => setVehicleState(e.target.value)} 
                                required
                            >
                                <option value="">Seleccionar...</option>
                                <option value="booked">Libre</option>
                                <option value="free">Reservado</option>
                            </select>
                            {errors.vehicle_state && <span className="error-message">{errors.vehicle_state}</span>}
                        </fieldset>
                        <button type="submit" className='btn'>Registrar</button>
                    </form>
                    <button onClick={onCloseCreate} className='close-button'>Cerrar</button>
                </div>
            </div>
        </div>
    );
};
