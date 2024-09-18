import React, {useState} from "react";
import './Styles.css'

import FormInput from "../../components/formInput/FormInput";
import Illustration from "../../components/illustation/Illustration";
import SignupButton from "../../components/signupButton/SignupButton";

const Login: React.FC = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = () => {
    console.log('Logando: ', {email, password})
  }

  return(
    <div className="signup-page">

      <div className="left-section">
        <Illustration /> {/*Illustração*/}
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

        <SignupButton text="Realizar Login!" onClick={handleSignup}/>
        
        <p className="footer">Não tenho conta ainda!</p>
      </div>

    </div>
  )
}

export default Login;