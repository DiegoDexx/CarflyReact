import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTokenFromStorage, getUserIdFromStorage } from '../../functions/storage';

export const EditCompany = ({ companyId, onClose  }) => {
  const [companyData, setCompanyData] = useState({});
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
    const [companyCity, setCompanyCity] = useState('');
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyService, setCompanyService] = useState('parking');
  const [companyType, setCompanyType] = useState('big_company');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = getTokenFromStorage('authToken');
        const response = await axios.get(`http://localhost:8000/api/companies/${companyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const company = response.data;
        setCompanyData(company);
        setCompanyName(company.company_name || '');
        setCompanyAddress(company.company_address || '');
        setCompanyCity(company.company_city || '');
        setCompanyPhoneNumber(company.company_phone_number || '');
        setCompanyEmail(company.company_email || '');
        setCompanyDescription(company.company_description || '');
        setCompanyService(company.company_service || 'parking');
        setCompanyType(company.company_type || 'big_company');
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompanyData();
  }, [companyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getTokenFromStorage('authToken');

    try {
      const response = await axios.put(`http://localhost:8000/api/companies/${companyId}`, {
        company_name: companyName,
        company_address: companyAddress,
        company_city: companyCity,
        company_phone_number: companyPhoneNumber,
        company_email: companyEmail,
        company_description: companyDescription,
        company_service: companyService,
        company_type: companyType,
        user_id: companyData.user_id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCompanyData(response.data.company);
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error actualizando datos de la compañía:', error);
        alert('Hubo un error al actualizar los datos de la compañía');
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
          <h4>Editar Compañía</h4>
        </div>
        <div className="modal-content">
          <form className="login-form" onSubmit={handleSubmit}>
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
            {/*Elegir capitales de paises de hablahispana*/}
            <fieldset className="form-group">
                <label htmlFor="company_city">Ciudad</label>
                <select  className={`form-control ${errors.company_city ? 'is-invalid' : ''}`}
                id="company_city"
                value={companyCity}
                onChange={e => setCompanyCity(e.target.value)}
                required
                >
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="La Paz">La Paz</option>
                    <option value="Brasilia">Brasilia</option>
                    <option value="Santiago">Santiago</option>
                    <option value="Bogota">Bogota</option>
                    <option value="Quito">Quito</option>
                    <option value="San Salvador">San Salvador</option>
                    <option value="Asuncion">Asuncion</option>
                    <option value="Lima">Lima</option>
                    <option value="Montevideo">Montevideo</option>
                    <option value="Caracas">Caracas</option>
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
            <button className="btn btn-primary" type="submit">Guardar cambios</button>
          </form>
        </div>
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>
    </div>
 
  );
};

