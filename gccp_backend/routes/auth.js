const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const db = require("../db");

const { restrictToAdmin } = require("../middlewares");

const router = express.Router();

router.post("/loginAdmin", async (req, res) => {
  try {
    const admin = req.body;
    const adminsRef = db.collection('admins');
    const snapshot = await adminsRef.where('email', '==', admin.email).get();
    if (snapshot.empty) {
      return res
        .status(400)
        .json({ success: false, message: "login with correct credentials" });
    } else {
      let adminData;
      snapshot.forEach((doc) => {
        adminData={id:doc.id,...doc.data()};
      });
      const match = await bcrypt.compare(admin.password, adminData.password);

      if (match) {
        const token = jwt.sign({ id: adminData.id }, process.env.JWT_SECRET);

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
    const secPassword = await bcrypt.hash(req.body.password, salt);
    const city = _.lowerCase(req.body.city);

    const bloodbanksRef = db.collection('bloodbanks');
    const bloodBank = {
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
      city: city,
      ContactNumber: req.body.ContactNumber,
      BloodGroup:{
        A_pos: 0,
        A_neg: 0,
        B_pos: 0,
        O_pos: 0,
        AB_pos: 0,
        B_neg:0,
        O_neg: 0,
        AB_neg: 0
      }
    };

    await bloodbanksRef.add(bloodBank);
    
    return res
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
    const bloodbanksRef = db.collection('bloodbanks');

    const snapshot = await bloodbanksRef.where('email', '==', bloodBank.email).get();

    if (snapshot.empty) {
      return res
        .status(400)
        .json({ success: false, message: "login with correct credentials" });
    } else {
      let bloodBankData;
      snapshot.forEach((doc) => {
        bloodBankData={id:doc.id,...doc.data()};
      });
      const match = await bcrypt.compare(
        bloodBank.password,
        bloodBankData.password
      );

      if (match) {
        console.log(match)
        const token = jwt.sign(
          { id: bloodBankData.id },
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
      const docRef = db.collection('bloodbanks').doc(info.id)
      const doc = await docRef.get();
      if (!doc.exists) {
        return res.status(200).json({ loggedIn: false });
      }
      return res.status(200).json({ loggedIn: true });
    }
  } catch (error) {
    return res.status(200).json({ loggedIn: false });
  }
});

module.exports = router;
