import React, { useEffect, useState, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import "./styles/navbar.css";
import { BloodContext } from "../App";

function Navbar() {
  const {isBloodBankLoggedIn,setIsBloodBankLoggedIn}=useContext(BloodContext);
  useEffect(() => {
    async function checkIsBloodBankLoggedIn() {
      try {
        let res = await axios({
          method: "get",
          url: `${process.env.REACT_APP_SERVER}/api/auth/isBloodBankLoggedIn`,
          withCredentials: true,
        });
        setIsBloodBankLoggedIn(res.data.loggedIn);
      } catch (error) {
        setIsBloodBankLoggedIn(false);
      }
    }
    checkIsBloodBankLoggedIn();
  }, [isBloodBankLoggedIn, setIsBloodBankLoggedIn]);

  return (
    <div>
      <nav>
        <Link to="/">🩸</Link>
        <div>
          <Link to="/hospital">Hospital</Link>
          <Link to="/donor">Donor</Link>
          {isBloodBankLoggedIn ? (
            <Link to="/hospitalDashboard">Hospital Dashboard</Link>
          ) : null}
        </div>
      </nav>
      <hr></hr>
      <Outlet />
    </div>
  );
}
export default Navbar;
