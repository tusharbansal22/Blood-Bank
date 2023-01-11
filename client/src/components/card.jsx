import React from "react";
import "./styles/card.css"

import  { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation } from "react-router-dom";

function Card(){

  const {state} = useLocation();


  const bbs  = state.cards
  const render_BloodBank = bbs.map((bb)=>
  <div className="card">

              <p>Name : {bb.name}</p>
              <p>Contact : {bb.ContactNumber} </p>
              <p>City : {bb.city[0].toUpperCase() + bb.city.slice(1)}</p>  
                
                </div>)
    return (
      <div  >
      {render_BloodBank}
      </div>
    );
  }
   


export default Card;