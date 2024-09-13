import { Navigate, Route, Routes } from "react-router-dom";
import { CalendarPage, PromoPage, ServicePage, HomePage } from "../pages";

export const AgendaRouter = () => {
  return (
    <Routes>
      <Route path="home" element={<HomePage />} />  
      <Route path="servicios" element={<ServicePage />} />  
      <Route path="agenda" element={<CalendarPage />} /> 
      <Route path="promo" element={<PromoPage />} /> 
      <Route path="/" element={<Navigate to="/menu/home" />} />
    </Routes>
  );
};