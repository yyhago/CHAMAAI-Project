import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import PrivateRoute from './components/PrivateRoute';

import './styles/global.css';

const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // Verifica se o token está no localStorage
  return !!token;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} /> {/* Página de Signup */}
        <Route path="/login" element={<Login />} /> {/* Página de Login */}
        <Route path="/" element={isAuthenticated() ? <Navigate to="/home" /> : <Navigate to="/login" />} /> {/* Redireciona com base na autenticação */}
        <Route path="/" element={<PrivateRoute />}> {/* Rota Privada para a Home */}
          <Route path="/home" element={<Home />} /> {/* Página Home acessível apenas para usuários logados */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
