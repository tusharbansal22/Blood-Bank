import React from "react";
import BloodForm from "../components/bloodform";
import "./pagestyles/home.css";

function Home(){
  return (<div class='main'>
  <div className="welcome-text">
  <p id="welcome-to-text">Welcome To</p>
  <p id="blood-bank-text">Blood Bank</p>
  </div>
  <div className="form-div">
  <p>Searching for Blood?</p>
   <BloodForm></BloodForm>
  </div>
  </div>);
}

export default Home