
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../hooks';

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp;
        {user.name}
      </span>
      <NavLink
        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-brand`}
        to="/menu/home"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-brand`}
        to="/menu/servicios"
      >
        Servicios
      </NavLink>
      <NavLink
        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-brand`}
        to="/menu/agenda"
      >
        Agenda
      </NavLink>
      <NavLink
        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-brand`}
        to="/menu/promo"
      >
        Promociones
      </NavLink>
      <button
        className="btn btn-outline-danger"
        onClick={startLogout}
      >
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  );
};