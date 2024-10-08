import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import PrivateRoute from './components/PrivateRoute'; // Importando a rota privada

import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} /> {/* Página de Signup */}
        <Route path="/login" element={<Login />} /> {/* Página de Login */}
        <Route path="/" element={<PrivateRoute />}> {/* Rota Privada para a Home */}
          <Route path="/home" element={<Home />} /> {/* Página Home acessível apenas para usuários logados */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
