import React, {useState} from "react";
import './Styles.css'

import FormInput from "../../components/formInput/FormInput";
import Illustration from "../../components/illustation/Illustration";
import SignupButton from "../../components/signupButton/SignupButton";

const Signup: React.FC = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = () => {
    console.log('Cadastrando: ', {username, email, password})
  }

  return(
    <div className="signup-page">

      <div className="left-section">
        <Illustration /> {/*Illustração*/}
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

        <SignupButton text="Cadastrar!" onClick={handleSignup}/>
        
        <p className="footer">Já possuo conta, quero logar!</p>
      </div>

    </div>
  )
}

export default Signup;