import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenFromStorage, getUserIdFromStorage } from '../../functions/storage';

export const EditVehicle = ({ companyId, onCloseEdit, vehicleId}) => {
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
    const [isLoading, setIsLoading] = useState(false);

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
        useEffect(() => {

   


        const fetchVehicleData = async () => {
            try {
                setIsLoading(true);
                const token = getTokenFromStorage('authToken');
                const response = await axios.get(`http://localhost:8000/api/vehicles/${vehicleId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const vehicleData = response.data;
                setCompanyId(vehicleData.company_id || '');
                setBrand(vehicleData.brand || '');
                setModel(vehicleData.model);
                setBookingPrice(vehicleData.booking_price || '');
                setFuelType(vehicleData.fuel_type || '');
                setITVState(vehicleData.ITV_state || '');
                setLicensePlate(vehicleData.license_plate || '');
                setVehicleState(vehicleData.vehicle_state || '');
                setYear(vehicleData.year || '');


                // Agrega lógica para los demás campos del vehículo
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
                setIsLoading(false);
            }
        };

        fetchVehicleData();
    }, [vehicleId]);

    const handleUpdateVehicle = async () => {
        try {
            setIsLoading(true);
            const token = getTokenFromStorage('authToken');
           
  
            // Agrega lógica para los demás campos del vehículo
            const response = await axios.put(`http://localhost:8000/api/vehicles/${vehicleId}` ,{
                company_id: company_id,
                brand: brand,
                model: model,
                image: image,
                year: year,
                fuel_type: fuelType,
                license_plate: licensePlate,
                ITV_state: ITVState,
                booking_price: bookingPrice,
                vehicle_state: vehicleState,
             }, {
                headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });

            console.log('Vehicle updated:', response.data);
            setIsLoading(false);
            onCloseEdit(); // Cierra el modal después de la actualización
            //recarga la pagina 
            window.location.reload();
            // Aquí puedes agregar lógica para recargar la página si es necesario
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error updating vehicle:', error);
            }
            setIsLoading(false);
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
                <h4>Editar Vehículo</h4>
            </div>
            <div className="modal-content">
                {isLoading ? (
                    <p>Cargando...</p>
                ) : (
                    <form className="login-form" onSubmit={e => { e.preventDefault(); handleUpdateVehicle(); }}>
                        <fieldset className="form-group">
                            <label htmlFor="company_id">Compañía</label>
                            <select 
                                id="company_id" 
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
                            />
                            {errors.brand && <span className="error-message">{errors.brand}</span>}
                        </fieldset>
                        {/*Model fieldset */}
                        <fieldset className="form-group">
                            <label htmlFor="model">Modelo</label>
                            <input
                                type="text"
                                id="model"
                                value={model}
                                onChange={e => setModel(e.target.value)}
                                required
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
                            />
                            {errors.booking_price && <span className="error-message">{errors.booking_price}</span>}
                        </fieldset>
                        <fieldset className="form-group">
                            <label htmlFor="vehicleState">Estado del Vehículo</label>
                            <select 
                                id="vehicleState" 
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
                        <button className="btn btn-primary" type="submit">Actualizar</button>
                    </form>
                )}
            </div>
            <button onClick={onCloseEdit} className="close-button">Cerrar</button>
        </div>
    </div>
    );
};

export default EditVehicle;
