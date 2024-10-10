import React, { useState } from "react";
import './Styles.css';

import FormInput from "../../components/formInput/FormInput";
import Illustration from "../../components/illustation/Illustration";
import SignupButton from "../../components/signupButton/SignupButton";
import { login } from "../../services/apiService"; // Importe a função de login do apiService

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(email, password); // Chama a função de login
      localStorage.setItem('token', response.data.token); // Armazena o token no localStorage
      window.location.href = '/home'; // Redireciona para a Home após o login
    } catch (error) {
      console.error('Erro ao realizar login:', error);
    }
  }

  return (
    <div className="signup-page">
      <div className="left-section">
        <Illustration /> {/* Ilustração */}
      </div>

      <div className="right-section">
        <h2>Chama AII!</h2>
        <p>Que bom ter você aqui de volta. Faça seu login e bora conversar!</p>

        <FormInput 
          label="Seu email cadastrado :"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormInput 
          label="Sua senha cadastrada :"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <SignupButton text="Realizar Login!" onClick={handleLogin} /> {/* Chama a função handleLogin */}
        
        <p className="footer">
          <span onClick={() => window.location.href = '/signup'} style={{ cursor: 'pointer', color: 'pink' }}>Não tenho conta ainda!</span>
        </p>
      </div>
    </div>
  )
}

export default Login;
