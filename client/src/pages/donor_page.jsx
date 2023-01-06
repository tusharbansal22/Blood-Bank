import React from 'react'
import "./pagestyles/donor_page.css"


function Donor(){
    return(
        <div>
            
            <div className="move">
            <p className="text">Be the reason for someone's heartbeat...</p>
    <img className="side-img text"  src="https://img.freepik.com/premium-vector/woman-donating-blood-illustration_227564-264.jpg?w=740" alt="side img"/>
        <form>
        <label>
            Enter your First Name:
        </label><br/><input className="input" name="firstname" type="text" placeholder="First Name..."/>
        <br/>
        <label>
            Enter your Second Name:</label><br/><input className="input" name="secondname" placeholder="Second Name..."/>
        <br/>
        <label>
            Enter your age:</label><br/><input className="input" name="age" placeholder="Age..."/>
        <br/>
        <label>
            Enter the city name you belong to:</label><br/><input className="input" name="city" placeholder="City..."/>
        <br/>
        <label>
            Enter your Phone number:</label><br/><input className="input" name="ph.no" placeholder="Ph.no..."/>
        <br/>
        <label>
            Enter your Blood group:</label><br/><input className="input" name="bloodgroup" placeholder="Blood type..."/>
        <br/>
        <br/>
        <input className="submit" type="submit" name="Sub" />
        </form>
        </div>
        </div>
    )
}

export default Donor;
