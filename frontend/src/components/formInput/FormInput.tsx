import React from "react";

import './Styles.css'

// Interface para os props que o componente vai receber
interface formInputProps {
  label: string;
  type: string;
  value: string;
  // Função que vai lidar com a mudança do valor
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<formInputProps> = ({label, type, value, onChange}) => {
  return(
    <div className="form-group">
      <label>
        {label}
      </label>
      <input
        type = {type}
        value = {value}
        onChange = {onChange}
        className="form-input"
      />
    </div>
  )
}

export default FormInput;