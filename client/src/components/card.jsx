import React from "react";
import "./styles/card.css"

import  { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation } from "react-router-dom";

function Card(){

  const {state} = useLocation();
  console.log(state)

  const bbs  = state.cards
  console.log(bbs);
//   const [loading, setLoading] = useState(false);
//   const [Bloodbanks,set_Bloodbanks]= useState("");
//   useEffect(()=>{
//     const loadPost = async()=>{
//       setLoading(true);
    
//     const response = await axios.get('http://localhost:80/api/general/donor')
//     set_Bloodbanks(response.data);
//     setLoading(false);
//     }
//     loadPost();
//  },[])
//  console.log(Bloodbanks)
  // const BloodBank = JSON.stringify(HospitalDetails);
  // console.log(HospitalDetails);

  const render_BloodBank = bbs.map((bb)=>
  <div className="card">

              <p>Name : {bb.name}</p>
              <p>Contact :{bb.ContactNumber} </p>
              <p>City: {bb.city}</p>  
                
                </div>)
    return (
      <div  >
      {render_BloodBank}
      </div>
    );
  }
   


export default Card;