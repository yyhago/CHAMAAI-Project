import React from "react";

// Interface para mostrar os props que irão para meu componente
interface signupButtonProps{
  onClick: () => void; 
  text: string;
}

const SignupButton: React.FC<signupButtonProps> = ({onClick, text}) => {
  return(
    <button className="signup-button" onClick={onClick}>
      {text}
    </button>
  )
}


export default SignupButton;