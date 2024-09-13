import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { HomePage } from "../calendar/pages";
import { useEffect } from "react";

import { AgendaRouter } from "../calendar/router/AgendaRouter";
import { Footer, Navbar } from "../calendar/components";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <h3>Cargando...</h3>;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {status === 'not-authenticated' ? (
            <>
              <Route path="/auth/*" element={<LoginPage />} />
              <Route path="/*" element={<Navigate to="/auth/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu/*" element={<AgendaRouter />} />
              <Route path="/*" element={<Navigate to="/menu/home" />} />
            </>
          )}
        </Routes>
      </div>
    <Footer/>  
    </>
  );
};