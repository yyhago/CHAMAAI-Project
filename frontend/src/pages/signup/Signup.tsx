import React, { useState } from "react";
import './Styles.css';

import FormInput from "../../components/formInput/FormInput";
import Illustration from "../../components/illustation/Illustration";
import SignupButton from "../../components/signupButton/SignupButton";
import { createUser } from "../../services/apiService"; // Importe a função de criar usuário do apiService

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await createUser(username, email, password); // Chama a função de criar usuário
      console.log('Usuário cadastrado com sucesso:', response.data);
      window.location.href = '/login'; // Redireciona para a página de Login após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  }

  return (
    <div className="signup-page">
      <div className="left-section">
        <Illustration /> {/* Ilustração */}
      </div>

      <div className="right-section">
        <h2>Chama AII!</h2>
        <p>Vamos lá, primeiro faça seu cadastro ou entre com sua conta!</p>

        <FormInput 
          label="Seu melhor nome de usuário :"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <FormInput 
          label="Seu email preferido :"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormInput 
          label="Sua senha mais forte :"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <SignupButton text="Cadastrar!" onClick={handleSignup} /> {/* Chama a função handleSignup */}
        
        <p className="footer">
          <span onClick={() => window.location.href = '/login'} style={{ cursor: 'pointer', color: 'pink' }}>Já tenho conta!</span>
        </p>
      </div>
    </div>
  )
}

export default Signup;
