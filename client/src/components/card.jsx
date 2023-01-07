import React from "react";
import "./styles/card.css"


function Card(data){

  const HospitalDetails = data
  
  // const BloodBank = JSON.stringify(HospitalDetails);
  console.log(HospitalDetails);
  
    return (
      <div className="card" >

        
        <p>{HospitalDetails[0].city}</p>
        <p>Quantity available : 50</p>

      </div>
    )
  }
   


export default Card;