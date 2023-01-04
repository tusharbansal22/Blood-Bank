import React from "react";
import "./pagestyles/home.css";
 
function HospitalLogin(){
  return (<div class='main'>
  <div className="box">
  <div className="hlogin-div">
  <p id="hospital-login-text">Hospital Login</p>
  <form className="form-div">
    <div>
      <input className="field" type="email" title="email" placeholder="Email Address:"/>
    </div>
    <div>
      <input  className="field" type="password" placeholder="Password"/>
    </div>
    <input className="submit-button" type="submit" value="Login"/>
    <div><a href="#">Forgot Password?</a></div>
  </form>
  </div>
  </div>
  </div>);
}
 
export default HospitalLogin