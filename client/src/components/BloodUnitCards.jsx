import React from "react";
import "./styles/card.css"

import  { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation } from "react-router-dom";

function BloodIUnitCards(){

  const {state} = useLocation();

  const bbs  = state.cards

  const render_BloodBank = bbs.map((bb, i)=>
  <div className="card" key={i}>

              <p>Name : {bb.hosp.name}</p>
              <p>Contact :{bb.hosp.ContactNumber} </p>
              <p>City: {bb.hosp.city[0].toUpperCase() + bb.hosp.city.slice(1)}</p> 
               {bb.compatibleBlood.map((Comp_blood,i)=>{
                return(
                    <div key={i}>
                    <span>{Comp_blood.blood}:  </span>
                    <span>{Comp_blood.unit}</span>
                    </div>
                )
               })}
                
                </div>)
    return (
      <div  >
      {render_BloodBank}
      </div>
    );
  }
   


export default BloodIUnitCards;