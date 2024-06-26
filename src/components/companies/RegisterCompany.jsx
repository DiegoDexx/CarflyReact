import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenFromStorage, getUserIdFromStorage } from '../../functions/storage';

 const RegisterCompany = ({ onClose, modalClass }) => {
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [companyPhoneNumber, setCompanyPhoneNumber] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [companyService, setCompanyService] = useState('parking');
    const [companyType, setCompanyType] = useState('big_company');
    const [errors, setErrors] = useState({});
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const storedUserId = getUserIdFromStorage('userId');
        setUserId(storedUserId);
    }, []);

    const handleRegisterCompany = async () => {
        try {
            const token = getTokenFromStorage('authToken');
            const response = await axios.post('http://localhost:8000/api/companies', {
                company_name: companyName,
                company_address: companyAddress,
                company_city: companyCity,
                company_phone_number: companyPhoneNumber,
                company_email: companyEmail,
                company_description: companyDescription,
                company_service: companyService,
                company_type: companyType,
                user_id: userId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Company registered:', response.data);
            setErrors({});
            // Clear form fields after successful registration
            setCompanyName('');
            setCompanyAddress('');
            setCompanyCity('');
            setCompanyPhoneNumber('');
            setCompanyEmail('');
            setCompanyDescription('');
            setCompanyService('parking');
            setCompanyType('big_company');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error registering company:', error);
            }
        }
    };

    return (
        <div className={modalClass}>
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
                    <h4>Registrar Compañía</h4>
                </div>
                <div className="modal-content">
                    <form className="login-form" onSubmit={e => { e.preventDefault(); handleRegisterCompany(); }}>
                    <input type="hidden" value={userId} />
                        <fieldset className="form-group">
                            <label htmlFor="company_name">Nombre de la Compañía</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.company_name ? 'is-invalid' : ''}`} 
                                id="company_name"
                                value={companyName} 
                                onChange={e => setCompanyName(e.target.value)} 
                                placeholder="Nombre de la Compañía"
                                required 
                            />
                            {errors.company_name && <span className="text-danger">{errors.company_name}</span>}
                        </fieldset>
                        <fieldset className="form-group">
                            <label htmlFor="company_address">Dirección de la Compañía</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.company_address ? 'is-invalid' : ''}`} 
                                id="company_address"
                                value={companyAddress} 
                                onChange={e => setCompanyAddress(e.target.value)} 
                                placeholder="Dirección de la Compañía"
                                required 
                            />
                            {errors.company_address && <span className="text-danger">{errors.company_address}</span>}
                        </fieldset>
                        {/*Elegir la ciudad*/}
                        <fieldset className="form-group">
                            <label htmlFor="company_city">Ciudad</label>
                            <select 
                                className={`form-control ${errors.company_city ? 'is-invalid' : ''}`} 
                                id="company_city"
                                value={companyCity} 
                                onChange={e => setCompanyCity(e.target.value)} 
                                required
                            >
                                <option value="Bogotá">Bogotá</option>
                                <option value="Medellín">Medellín</option>
                                <option value="Cali">Cali</option>
                                <option value="Barranquilla">Barranquilla</option>
                                <option value="Pasto">Pasto</option>
                                <option value="Riohacha">Riohacha</option>
                                <option value="San Andrés">San Andrés</option>
                                <option value="Leticia">Leticia</option>
                                {/*Agregar las capitales de Sudámerica*/}
                                <option value="Lima">Lima</option>
                                <option value="Buenos Aires">Buenos Aires</option>
                                <option value="Brasilia">Brasilia</option>
                                <option value="Santiago">Santiago</option>
                                <option value="Quito">Quito</option>
                                <option value="Asunción">Asunción</option>
                                <option value="Montevideo">Montevideo</option>
                                {/*Agregar las ciudades de España*/}
                                <option value="Madrid">Madrid</option>
                                <option value="Barcelona">Barcelona</option>
                                <option value="Valencia">Valencia</option>
                                <option value="Sevilla">Sevilla</option>
                                <option value="Zaragoza">Zaragoza</option>
                                <option value="Málaga">Málaga</option>
                                <option value="Murcia">Murcia</option>
                                <option value="Elche">Elche</option>
                            </select>
                            {errors.company_city && <span className="text-danger">{errors.company_city}</span>}
                        </fieldset>
                    
                        <fieldset className="form-group">
                            <label htmlFor="company_phone_number">Número de Teléfono</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.company_phone_number ? 'is-invalid' : ''}`} 
                                id="company_phone_number"
                                value={companyPhoneNumber} 
                                onChange={e => setCompanyPhoneNumber(e.target.value)} 
                                placeholder="Número de Teléfono"
                                required 
                            />
                            {errors.company_phone_number && <span className="text-danger">{errors.company_phone_number}</span>}
                        </fieldset>
                        <fieldset className="form-group">
                            <label htmlFor="company_email">Correo Electrónico</label>
                            <input 
                                type="email" 
                                className={`form-control ${errors.company_email ? 'is-invalid' : ''}`} 
                                id="company_email"
                                value={companyEmail} 
                                onChange={e => setCompanyEmail(e.target.value)} 
                                placeholder="Correo Electrónico"
                                required 
                            />
                            {errors.company_email && <span className="text-danger">{errors.company_email}</span>}
                        </fieldset>
                        <fieldset className="form-group">
                            <label htmlFor="company_description">Descripción</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.company_description ? 'is-invalid' : ''}`} 
                                id="company_description"
                                value={companyDescription} 
                                onChange={e => setCompanyDescription(e.target.value)} 
                                placeholder="Descripción"
                                required 
                            />
                            {errors.company_description && <span className="text-danger">{errors.company_description}</span>}
                        </fieldset>
                        <fieldset className="form-group">
                            <label htmlFor="company_service">Servicio</label>
                            <select 
                                className={`form-control ${errors.company_service ? 'is-invalid' : ''}`} 
                                id="company_service"
                                value={companyService} 
                                onChange={e => setCompanyService(e.target.value)} 
                                required
                            >
                                <option value="parking">Parking</option>
                                <option value="car_rental">Car Rental</option>
                            </select>
                            {errors.company_service && <span className="text-danger">{errors.company_service}</span>}
                        </fieldset>
                        <fieldset className="form-group">
                            <label htmlFor="company_type">Tipo de Compañía</label>
                            <select 
                                className={`form-control ${errors.company_type ? 'is-invalid' : ''}`} 
                                id="company_type"
                                value={companyType} 
                                onChange={e => setCompanyType(e.target.value)} 
                                required
                            >
                                <option value="big_company">Big Company</option>
                                <option value="individual_company">Individual Company</option>
                            </select>
                            {errors.company_type && <span className="text-danger">{errors.company_type}</span>}
                        </fieldset>
                  
                        <button className="btn btn-primary" type="submit">Registrar</button>
                    </form>
                </div>
                <button onClick={onClose} className="close-button">Cerrar</button>
            </div>
        </div>
    );
};

export default RegisterCompany;


