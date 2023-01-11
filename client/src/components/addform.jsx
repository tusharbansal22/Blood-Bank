import React from "react";
import axios from "axios";
import { useState} from "react";

function AddForm({updateBlood}){
  const [bloodData,setBloodData]=useState({bloodGroup:"",bloodUnit:""});

  function handleChange(e) {
    setBloodData({ ...bloodData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e){
    e.preventDefault();
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER}/api/general/bloodBank/update`,
        data: bloodData,
        withCredentials:true
      });
      console.log(res.data)
      updateBlood(bloodData.bloodGroup,bloodData.bloodUnit);
    } catch (error) {
      console.log(error.response);
    }
  }
    return (
      
      <form >
      <div>
        <p className="edit-text">Add/Remove blood:</p>
      </div>
      <div>
        <label>
          <select className="field" name="bloodGroup" value={bloodData.bloodGroup} onChange={handleChange} placeholder="A+">
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
        <div>
        <label>
          <input className="field" type="number" name="bloodUnit" value={bloodData.bloodUnit} onChange={handleChange} placeholder="Enter Quantity"/>
        </label>
        </div>
        <input className="submit-button" type="submit" value="Submit" onClick={handleSubmit}/>
      </form>
    );
    }

export default AddForm;