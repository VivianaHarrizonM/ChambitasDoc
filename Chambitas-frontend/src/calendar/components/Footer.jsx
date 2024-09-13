import React from 'react';

import '../pages/css/footer.css';

export const Footer = () => {
  return (
    <footer className="footer bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <span>&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
};