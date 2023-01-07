import React, { useState } from "react";
import axios from "axios";
import "./pagestyles/donor_page.css"
import Card from "../components/card";


function Donor(){

    const [donor, donorData] = useState({firstname:"", lastname: "",blood_group:"",age:"",phoneNumber:"", city: "" });

    function onChangeDonorData(e) {
        donorData({ ...donor, [e.target.name]: e.target.value });
      }

      async function onChangeSubmit(e) {
        e.preventDefault();
        try {
          let res = await axios({
            method: 'post',
            url: 'http://localhost:80/api/general/donor',
            data: donor,
            withCredentials:true
          });
      
          let data = res.data;
        //   console.log(data);
          
          return((Card(data)));
          
    
        }catch (error) {
          console.log(error.response);
        }
      }
    
    return(
        <div>
            
            <div className="move">
            <p className="text">Be the reason for someone's heartbeat...</p>
    { <img className="side-img text"  src="https://img.freepik.com/premium-vector/woman-donating-blood-illustration_227564-264.jpg?w=740" alt="side img"/> }
        <form>
        <label>
            Enter your First Name:
        </label><br/><input className="input" name="firstname" type="text" placeholder="First Name..."
         value={donor.firstname}
        onChange={onChangeDonorData}
         />
        <br/>
        <label>
            Enter your Second Name:</label><br/>
            <input className="input" name="lastname" placeholder="Second Name..."
                type="text"
                value={donor.lastname}
                onChange={onChangeDonorData}
            />
        <br/>
        <label>
            Enter your age:</label><br/>
            <input className="input" name="age" placeholder="Age..."
                type="number"
                value={donor.age}
            onChange={onChangeDonorData}
            />
        <br/>
        <label>
            Enter the city name you belong to:</label><br/>
            <input className="input" name="city" placeholder="City..."
            type="text"
                value={donor.city}
                onChange={onChangeDonorData}
            />
        <br/>
        <label>
            Enter your Phone number:</label><br/>
            <input className="input" name="phoneNumber" placeholder="Ph.no..."
                type="number"
                value={donor.phoneNumber}
                onChange={onChangeDonorData}
            />
        <br/>
        <label>
            Enter your Blood group:</label><br/>
            <input className="input" name="blood_group" placeholder="Blood type..."
            type="text"
                value={donor.blood_group}
        onChange={onChangeDonorData}
            />
        <br/>
        <br/>
        <input className="submit" type="submit" name="Submit"
        onClick={onChangeSubmit} />
        </form>
        </div>
        </div>
    )
}

export default Donor;
