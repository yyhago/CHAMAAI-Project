import React from "react";

const Rocket = require('../../assets/images/rocket_signup.png');


const Illustration: React.FC = () => {
  return(
    <div className="illustation">
      <img src={Rocket} alt='illustation signup'/>
    </div>
  )
}


export default Illustration