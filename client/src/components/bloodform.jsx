import React, { useState,useEffect } from "react";
import axios from "axios";

class BloodForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city:"",
      bloodGroup: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value =  target.value;
    const name = target.name;
    console.log(name,value);


    this.setState({
      [name]: value
    });
    
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.bloodGroup);
    event.preventDefault();
    let res =  axios({
      method: 'post',
      url: 'http://localhost:80/api/general/requirement',
      data: this.state,
      withCredentials:true
    });
    let data = res.data;
    console.log(data);
  }

  render() {
    return (
      
      <form onSubmit={this.handleSubmit}>
      <div>
        <label>
          <select className="field" name="bloodGroup" value={this.state.bloodGroup} onChange={this.handleChange} placeholder="A+">
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
          <input  className="field" type="text" name="city" value={this.state.city} onChange={this.handleChange} placeholder="Select City"/>
        </label>
        </div>
        <input className="submit-button" type="submit" value="Submit" />
      </form>
    );
  }
}

export default BloodForm;