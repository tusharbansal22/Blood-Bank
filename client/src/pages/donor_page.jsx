import React, { useState, useEffect  } from "react";
import axios from "axios";
import "./pagestyles/donor_page.css"
import Card from "../components/card";
import { useNavigate , renderMatches } from "react-router-dom";


function Donor(){

    const [donor, donorData] = useState({firstname:"", lastname: "",blood_group:"",age:"",phoneNumber:"", city: "" });
    const [Bloodbank,set_Bloodbank]= useState("");
    const navigate = useNavigate();
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
          console.log(res.data)
          const cards = res.data
          navigate("/card",{
            state:{
               cards:cards
            }
          });
        //  console.log(res.data[0]);
        //  for(let i=0;i<res.data.length;i++){
        //     set_Bloodbank(res.data[i]);
         
        //  }
         console.log(res.data);
         
         
    
        }catch (error) {
          console.log(error.response);
        }
    }
        // const [A_pos,set_A_pos]=useState("");
        // const [A_neg,set_A_neg]=useState("");
        // const [B_pos,set_B_pos]=useState("");
        // const [O_pos,set_O_pos]=useState("");
        // const [AB_pos,set_AB_pos]=useState("");
        // const [B_neg,set_B_neg]=useState("");
        // const [O_neg,set_O_neg]=useState("");
        // const [AB_neg,set_AB_neg]=useState("");
        // useEffect(() => {
        //   async function fetchBloodUnits() {
        //     try {
        //       let res = await axios({
        //         method: "get",
        //         url: "http://localhost:80/api/general/bloodBank",
        //         withCredentials: true,
        //       });
        //       set_A_pos(res.data.BloodUnit.A_pos);
        //       set_A_neg(res.data.BloodUnit.A_neg);
        //       set_B_pos(res.data.BloodUnit.B_pos);
        //       set_O_pos(res.data.BloodUnit.O_pos);
        //       set_AB_pos(res.data.BloodUnit.AB_pos);
        //       set_B_neg(res.data.BloodUnit.B_neg);
        //       set_O_neg(res.data.BloodUnit.O_neg);
        //       set_AB_neg(res.data.BloodUnit.AB_neg);
        //     } catch (error) {
        //       console.log(error);
        //     }
        //   }
        //   fetchBloodUnits();
        // }, []);
      
    
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
