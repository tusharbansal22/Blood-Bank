import React from "react";
import AddForm from "../components/addform";
import "./pagestyles/home.css";
import {useLocation, useNavigate} from 'react-router-dom';
import  { useState,useEffect } from "react";
import axios from "axios";

function Dashboard(){

  const {state} = useLocation();
  alert(state);
  return (<div>
  <div>
  <p class="dashboard-text">Blood Inventory</p>
  </div>
  <div class="main no-margin">
  <div class="container">
  <div class="bloody-box">
  <p class="blood-group"></p>
  <p>Unit</p>
  </div>
 
  <div class="bloody-box">
  <p class="blood-group">B+</p>
  <p>Unit</p>
  </div>
 
  <div class="bloody-box">
  <p class="blood-group">O+</p>
  <p>Unit</p>
  </div>
 
  <div class="bloody-box">
  <p class="blood-group">AB+</p>
  <p>Unit</p>
  </div>
 
  <div class="bloody-box">
  <p class="blood-group">A-</p>
  <p>Unit</p>
  </div>
 
  <div class="bloody-box">
  <p class="blood-group">B-</p>
  <p>Unit</p>
  </div>
 
  <div class="bloody-box">
  <p class="blood-group">O-</p>
  <p>Unit</p>
  </div>
 
  <div class="bloody-box">
  <p class="blood-group">AB-</p>
  <p>Unit</p>
  </div>
  </div>
  <AddForm></AddForm>
  </div>
  </div>);

}
 
export default Dashboard;