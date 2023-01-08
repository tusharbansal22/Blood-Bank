const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const Admin = require("../models/Admin");
const BloodBank = require("../models/BloodBank");

const { restrictToAdmin } = require("../middlewares");

const router = express.Router();

router.post("/loginAdmin", async (req, res) => {
  try {
    const admin = req.body;
    const adminData = await Admin.findOne({ email: admin.email });
    if (!adminData) {
      return res
        .status(400)
        .json({ success: false, message: "login with correct credentials" });
    } else {
      const match = await bcrypt.compare(admin.password, adminData.password);

      if (match) {
        const token = jwt.sign({ _id: adminData._id }, process.env.JWT_SECRET);

        return res
          .cookie("token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({ success: true, message: "login successful" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "login with correct credentials" });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
});

router.post("/createBloodBank", restrictToAdmin, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
  
    console.log()
    const secPassword = await bcrypt.hash(req.body.password, salt);
    const city = _.lowerCase(req.body.city);
    
    const bloodBank = new BloodBank({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      city: city,
      ContactNumber: req.body.ContactNumber,
      BloodGroup:{}
    });

    const createdBloodBank = await bloodBank.save();

    const token = jwt.sign(
      { _id: createdBloodBank._id },
      process.env.JWT_SECRET
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(201)
      .json({ success: true, message: "process successful" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "process failed" });
  }
});

router.post("/loginBloodBank", async (req, res) => {
  try {
    const bloodBank = req.body;
    
    // const salt = await bcrypt.genSalt(10);
    // const setPassword = await bcrypt.hash("Krishnan", salt);
    // console.log(setPassword)
    const bloodBankData = await BloodBank.findOne({ email: bloodBank.email });

    if (!bloodBankData) {
      return res
        .status(400)
        .json({ success: false, message: "login with correct credentials" });
    } else {
      const match = await bcrypt.compare(
        bloodBank.password,
        bloodBankData.password
      );

      if (match) {
        const token = jwt.sign(
          { _id: bloodBankData._id },
          process.env.JWT_SECRET
        );
        return res
          .cookie("token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({ success: true, message: "login successful" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "login with correct credentials" });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
});

router.get("/isBloodBankLoggedIn", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(200).json({ loggedIn: false });
    } else {
      const info = jwt.verify(token, process.env.JWT_SECRET);
      const user = await BloodBank.findById({ _id: info._id });
      if (!user) {
        return res.status(200).json({ loggedIn: false });
      }
      return res.status(200).json({ loggedIn: true });
    }
  } catch (error) {
    return res.status(200).json({ loggedIn: false });
  }
});

module.exports = router;
