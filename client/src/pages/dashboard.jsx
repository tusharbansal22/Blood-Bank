import React from "react";
import AddForm from "../components/addform";
import "./pagestyles/home.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {

  const [A_pos,set_A_pos]=useState("");
  const [A_neg,set_A_neg]=useState("");
  const [B_pos,set_B_pos]=useState("");
  const [O_pos,set_O_pos]=useState("");
  const [AB_pos,set_AB_pos]=useState("");
  const [B_neg,set_B_neg]=useState("");
  const [O_neg,set_O_neg]=useState("");
  const [AB_neg,set_AB_neg]=useState("");

  useEffect(() => {
    async function fetchBloodUnits() {
      try {
        let res = await axios({
          method: "get",
          url: "http://localhost:80/api/general/bloodBank",
          withCredentials: true,
        });
        set_A_pos(res.data.BloodUnit.A_pos);
        set_A_neg(res.data.BloodUnit.A_neg);
        set_B_pos(res.data.BloodUnit.B_pos);
        set_O_pos(res.data.BloodUnit.O_pos);
        set_AB_pos(res.data.BloodUnit.AB_pos);
        set_B_neg(res.data.BloodUnit.B_neg);
        set_O_neg(res.data.BloodUnit.O_neg);
        set_AB_neg(res.data.BloodUnit.AB_neg);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBloodUnits();
  }, []);
  return (
    <div>
      <div>
        <p class="dashboard-text">Blood Inventory</p>
      </div>
      <div class="main no-margin">
        <div class="container">
          <div class="bloody-box">
            <p class="blood-group">A+</p>
            <p>{A_pos} Unit</p>
          </div>

          <div class="bloody-box">
            <p class="blood-group">A-</p>
            <p>{A_neg} Unit</p>
          </div>

          <div class="bloody-box">
            <p class="blood-group">B+</p>
            <p>{B_pos} Unit</p>
          </div>

          <div class="bloody-box">
            <p class="blood-group">O+</p>
            <p>{O_pos} Unit</p>
          </div>

          <div class="bloody-box">
            <p class="blood-group">AB+</p>
            <p>{AB_pos} Unit</p>
          </div>

          <div class="bloody-box">
            <p class="blood-group">B-</p>
            <p>{B_neg} Unit</p>
          </div>

          <div class="bloody-box">
            <p class="blood-group">O-</p>
            <p>{O_neg} Unit</p>
          </div>

          <div class="bloody-box">
            <p class="blood-group">AB-</p>
            <p>{AB_neg} Unit</p>
          </div>
        </div>
        <AddForm></AddForm>
      </div>
    </div>
  );
}

export default Dashboard;
