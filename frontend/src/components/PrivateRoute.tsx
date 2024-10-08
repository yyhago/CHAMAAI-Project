import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Função que verifica se o usuário está autenticado
const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // Verifica se o token está no localStorage
  return !!token; // Retorna true se o token existir
};

const PrivateRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />; // Redireciona para o login se não estiver autenticado
};

export default PrivateRoute;
