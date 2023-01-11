import React,{useContext} from "react";
import "./pagestyles/home.css";
import {useNavigate} from 'react-router-dom';
import  { useState } from "react";
import axios from "axios";
import { BloodContext } from "../App";

function HospitalLogin(){
  const {setIsBloodBankLoggedIn}=useContext(BloodContext);
  const [bloodBankLogin, setBloodBankLogin] = useState({email: "", password: "" });
  const navigate = useNavigate();
  function onChangeBloodBankLogin(e) {
    
    setBloodBankLogin({ ...bloodBankLogin, [e.target.name]: e.target.value });
  }
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER}/api/auth/loginBloodBank`,
        data: bloodBankLogin,
        withCredentials:true
      });
      setIsBloodBankLoggedIn(true);
      navigate("/hospitalDashboard");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
  <div className='main'>
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
    <input className="submit-button" type="submit" value="Login" onClick={handleSubmit}/>  
    <a href="">Forgot Password?</a>
  </div>
  </div>
  </div>
  );
}
 
export default HospitalLogin