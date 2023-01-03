import React from "react";

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
  }

  render() {
    return (
      
      <form onSubmit={this.handleSubmit}>
      <div>
        <label>
          <select className="field" name="bloodGroup" value={this.state.bloodGroup} onChange={this.handleChange} placeholder="A+">
          <option value="unselected">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
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