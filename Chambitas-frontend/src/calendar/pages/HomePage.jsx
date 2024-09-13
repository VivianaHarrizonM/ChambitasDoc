import React, { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';
import chambitasImage from '../../assets/chambitas.jpeg';
import './css/HomePage.css';

export const HomePage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };
    return { style };
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <div className="container mt-4 home-container">
      <div className="row">
        <div className="col-lg-6">
          <img
            src={chambitasImage}
            alt="Descripción de la imagen"
            className="img-fluid custom-img"
          />
        </div>
        <div className="col-lg-6 d-flex flex-column justify-content-center custom-text">
          <div className="display-4 my-4">¿Quiénes somos?</div>
          <p className="lead">
            Somos una empresa pionera en garantizar el libre acceso a servicios básicos esenciales para comunidades de todo el mundo. Nuestra misión es mejorar la calidad de vida proporcionando acceso asequible y sostenible a servicios de saneamiento.
          </p>
        </div>
      </div>
    </div>
  );
};
