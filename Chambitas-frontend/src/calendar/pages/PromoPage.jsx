import React from 'react';
import './css/Promo.css';

export const PromoPage = () => {
  return (
    <div className="container text-center mt-4  promo-container">
      <h2 className="my-4 title">Promociones Especiales</h2>
      <p className="lead sub-title">Aprovecha nuestras ofertas y promociones</p>
      
      <div className="row card-container">
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h4 className="card-title">Jueves de 2 x 1</h4>
              <p className="card-text">Aprovecha nuestra oferta de 2x1 todos los jueves en nuestros servicios seleccionados.</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h4 className="card-title">Descuento del 20%</h4>
              <p className="card-text">Obtén un 20% de descuento en servicios de plomería durante el mes de julio.</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h4 className="card-title">Promoción de Verano</h4>
              <p className="card-text">Descuento del 15% en todos los servicios de jardinería durante el verano.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
