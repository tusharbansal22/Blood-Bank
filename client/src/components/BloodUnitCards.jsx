import React from "react";
import "./styles/card.css"

import  { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation } from "react-router-dom";

function BloodIUnitCards(){

  const {state} = useLocation();

  const bbs  = state.cards
  console.log(bbs);

  const render_BloodBank = bbs.map((bb)=>
  <div className="card">

              <p>Name : {bb.hosp.name}</p>
              <p>Contact :{bb.hosp.ContactNumber} </p>
              <p>City: {bb.hosp.city}</p> 
               {bb.compatibleBlood.map((Comp_blood)=>{
                return(
                    <div>
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