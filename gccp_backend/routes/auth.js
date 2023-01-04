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
    console.log(adminData);

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

router.post("/createBloodBank",restrictToAdmin,async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    const city = _.lowerCase(req.body.city);
    const bloodBank = new BloodBank({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      city:city,
      phone : req.body.phone
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
          .send(bloodBankData);
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

module.exports = router;
