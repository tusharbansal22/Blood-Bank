import React from "react";
import AddForm from "../components/addform";
import "./pagestyles/home.css";
 
function Dashboard(){
  return (<div>
  <div>
  <p class="dashboard-text">Blood Inventory</p>
  </div>
  <div class="main no-margin">
  <div class="container">
  <div class="bloody-box">
  <p class="blood-group">A+</p>
  <p>Litres</p>
  </div>
 
  <div class="bloody-box">
  <p class="blood-group">B+</p>
  <p>Litres</p>
  </div>
 
  <div class="bloody-box">
  <p class="blood-group">O+</p>
  <p>Litres</p>
  </div>
 
  <div class="bloody-box">
  <p class="blood-group">AB+</p>
  <p>Litres</p>
  </div>
 
  <div class="bloody-box">
  <p class="blood-group">A-</p>
  <p>Litres</p>
  </div>
 
  <div class="bloody-box">
  <p class="blood-group">B-</p>
  <p>Litres</p>
  </div>
 
  <div class="bloody-box">
  <p class="blood-group">O-</p>
  <p>Litres</p>
  </div>
 
  <div class="bloody-box">
  <p class="blood-group">AB-</p>
  <p>Litres</p>
  </div>
  </div>
  <AddForm></AddForm>
  </div>
  </div>);

}
 
export default Dashboard;