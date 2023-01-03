import React, { useState } from "react";
import axios from "axios";

function App() {
  const [adminLogin, setAdminLogin] = useState({email: "", password: "" });
  const [createBloodBank, setCreateBloodBank] = useState({ name: "", email: "", password: "" });
  const [bloodBankLogin, setBloodBankLogin] = useState({email: "", password: "" });
  const [bloodGroupRequired, getBloodBank] = useState({blood_group:"", city: "" });

  function onChangeAdminLogin(e) {
    setAdminLogin({ ...adminLogin, [e.target.name]: e.target.value });
  }
  function onChangeCreateBloodBank(e) {
    setCreateBloodBank({ ...createBloodBank, [e.target.name]: e.target.value });
  }
  function onChangeBloodBankLogin(e) {
    setBloodBankLogin({ ...bloodBankLogin, [e.target.name]: e.target.value });
  }
  function onChangeBloodRequired(e) {
    getBloodBank({ ...bloodGroupRequired, [e.target.name]: e.target.value });
  }

  async function clickAdminLogin(e) {
    e.preventDefault();
    try {
      let res = await axios({
        method: 'post',
        url: 'http://localhost:80/api/auth/loginAdmin',
        data: adminLogin,
        withCredentials:true
      });
  
      let data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function clickCreateBloodBank(e){
    e.preventDefault();
    try {
      let res = await axios({
        method: 'post',
        url: 'http://localhost:80/api/auth/createBloodBank',
        data: createBloodBank,
        withCredentials:true
      });
  
      let data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function clickBloodBankLogin(e){
    e.preventDefault();
    try {
      let res = await axios({
        method: 'post',
        url: 'http://localhost:80/api/auth/loginBloodBank',
        data: bloodBankLogin,
        withCredentials:true
      });
  
      let data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  }
  
  async function clickBloodRequired(e) {
    e.preventDefault();
    try {
      let res = await axios({
        method: 'post',
        url: 'http://localhost:80/api/general/requirement',
        data: bloodGroupRequired,
        withCredentials:true
      });
  
      let data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div>
      <h1>Admin Login</h1>
      <input
        value={adminLogin.email}
        onChange={onChangeAdminLogin}
        placeholder="email"
        name="email"
        type="text"
      />
      <input
        value={adminLogin.password}
        onChange={onChangeAdminLogin}
        placeholder="password"
        name="password"
        type="text"
      />
      <input type="submit" value="Login Admin" onClick={clickAdminLogin} />
      <br />
      <h1>Create Blood Bank</h1>
      <input
        value={createBloodBank.name}
        onChange={onChangeCreateBloodBank}
        placeholder="name"
        name="name"
        type="text"
      />
      <input
        value={createBloodBank.email}
        onChange={onChangeCreateBloodBank}
        placeholder="email"
        name="email"
        type="text"
      />
      <input
        value={createBloodBank.password}
        onChange={onChangeCreateBloodBank}
        placeholder="password"
        name="password"
        type="text"
      />
      <input
        type="submit"
        value="Create Blood Bank"
        onClick={clickCreateBloodBank}
      />
      <br />
      <h1>Blood Bank Login</h1>
      <input
        value={bloodBankLogin.email}
        onChange={onChangeBloodBankLogin}
        placeholder="email"
        name="email"
        type="text"
      />
      <input
        value={bloodBankLogin.password}
        onChange={onChangeBloodBankLogin}
        placeholder="password"
        name="password"
        type="text"
      />
      <input
        type="submit"
        value="Blood Bank Login"
        onClick={clickBloodBankLogin}
      />
      <h1>Blood </h1>
      <input
        value={bloodGroupRequired.blood_group}
        onChange={onChangeBloodRequired}
        placeholder="blood group"
        name="blood_group"
        type="text"
      />
      <input
        value={bloodGroupRequired.city}
        onChange={onChangeBloodRequired}
        placeholder="city"
        name="city"
        type="text"
      />
      <input
        type="submit"
        value="Blood Bank Login"
        onClick={clickBloodRequired}
      />
    </div>
  );
}

export default App;
