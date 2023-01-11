import React, { useState } from "react";
import axios from "axios";
import { useNavigate , renderMatches } from "react-router-dom";



function BloodForm()  {

  const navigate = useNavigate();
  const [bloodGroupRequired, getBloodBank] = useState({blood_group:"", city: "" });

  function onChangeBloodRequired(e) {
    getBloodBank({ ...bloodGroupRequired, [e.target.name]: e.target.value });
  }
  
  async function clickBloodRequired(e) {
    e.preventDefault();
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER}/api/general/requirement`,
        data: bloodGroupRequired,
        withCredentials:true
      });
  
      let data = res.data;
      console.log(data)
      const cards =data;
          navigate("/BloodUnitCards",{
            state:{
               cards:cards
            }
          });
 
     
    } catch (error) {
      console.log(error.response);
    }
  }
  
    return (
      
      <form onSubmit={clickBloodRequired}>
      <div>
        <label>
          <select className="field" name="blood_group" value={bloodGroupRequired.blood_group} onChange={onChangeBloodRequired} placeholder="A+">
          <option value="unselected">Select Blood Type</option>
            <option value="A_pos">A+</option>
            <option value="A_neg">A-</option>
            <option value="B_pos">B+</option>
            <option value="B_neg">B-</option>
            <option value="AB_pos">AB+</option>
            <option value="AB_neg">AB-</option>
            <option value="O_pos">O+</option>
            <option value="O_neg">O-</option>
          </select>
        </label>
        </div>
        <div >
        <label>
          <input  className="field" type="text" name="city" value={bloodGroupRequired.city} onChange={onChangeBloodRequired} placeholder="Enter your City"/>
        </label>
        </div>
        <input className="submit-button" type="submit" value="Submit" />


      </form>
     
    );
  }


export default BloodForm;