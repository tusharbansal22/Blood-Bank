import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./styles/navbar.css"

function Navbar(){
  return(<div>
    <nav>
      <Link to="/">🩸</Link>
      <div>
      <Link to="/hospital">Hospital</Link>
      <Link to="/donor">Donor</Link>
      
      </div>
    </nav>
    <Outlet />
  </div>);
}

export default Navbar;