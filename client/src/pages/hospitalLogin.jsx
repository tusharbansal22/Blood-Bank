import React from "react";
import "./pagestyles/home.css";
import {useNavigate} from 'react-router-dom';
 
function HospitalLogin(){
  const navigate = useNavigate();
  const handleSubmit = event => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (<div class='main'>
  <div className="hlogin-div box">
  <p id="hospital-login-text">Hospital Login</p>
  <form className="form-div" onSubmit={handleSubmit} >
    <input className="field" type="email" title="email" placeholder="Email Address:"/>
    <input  className="field" type="password" placeholder="Password"/>
    <input className="submit-button" type="submit" value="Login"/>  
    <a href="#">Forgot Password?</a>
  </form>
  </div>
  </div>);
}
 
export default HospitalLogin