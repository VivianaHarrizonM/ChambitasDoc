import React, { useState } from 'react';
import './css/Service.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serviceProviders } from './ServiceProvaiders';

export const ServicePage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="container mt-4 service-container">
      <h1 className="text-center">Nuestros Servicios</h1>
      <hr className="custom-hr"/>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card-deck">
            {Object.keys(serviceProviders).map(service => (
              <div 
                key={service} 
                className={`card ${selectedService === service ? 'border-primary' : ''}`}
                onClick={() => handleServiceClick(service)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body">
                  <h5 className="card-title">{service}</h5>
                  <p className="card-text">Los más capacitados para su servicio </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-6 result-container">
          <h4 className="text-center">Prestadores de Servicio</h4>

          {selectedService && (
            <div>
              <ul className="list-group">
                {serviceProviders[selectedService].map((provider, index) => (
                  <li key={index} className="list-group-item">
                    <strong>{provider.name}</strong>
                    <br />
                    Contacto: {provider.contact}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
