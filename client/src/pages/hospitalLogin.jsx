import React from "react";
import "./pagestyles/home.css";
import {useNavigate} from 'react-router-dom';
import  { useState } from "react";
import axios from "axios";

function HospitalLogin(){

  const [bloodBankLogin, setBloodBankLogin] = useState({email: "", password: "" });

  function onChangeBloodBankLogin(e) {
    
    setBloodBankLogin({ ...bloodBankLogin, [e.target.name]: e.target.value });
  }

  async function clickBloodBankLogin(e){
    e.preventDefault();
    
    try {
      let res = await axios({
        method: 'post',
        url: 'http://localhost:80/api/auth/loginBloodBank',
        data: bloodBankLogin,
        withCredentials:true
      });
  
      let data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  }
  
  const navigate = useNavigate();
  const handleSubmit = event => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
  <div class='main'>
  <div className="hlogin-div box">
  <p id="hospital-login-text">Hospital Login</p>
  <div className="form-div" >
    <input className="field"
      type="email"
      name="email"
      placeholder="Email Address:"
      onChange={onChangeBloodBankLogin}
      value={bloodBankLogin.email}/>
    <input
      className="field"
      name = "password" 
      type="password" 
      placeholder="Password" 
      onChange={onChangeBloodBankLogin} 
      value={bloodBankLogin.password}/>
    <input className="submit-button" type="submit" value="Login" onClick={clickBloodBankLogin, handleSubmit}/>  
    <a href="">Forgot Password?</a>
  </div>
  </div>
  </div>
  );
}
 
export default HospitalLogin