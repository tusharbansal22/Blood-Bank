const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { restrictToAdmin } = require("../middlewares");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const BloodBank = require("../models/BloodBank");
const Donor = require("../models/Donor");
const { restrictToBloodBank } = require("../middlewares");
const _ = require("lodash");

function getCompatibleBloodTypes(bloodType) {
  // A list of all possible blood types
  const allBloodTypes = [
    "A_pos",
    "A_neg",
    "B_pos",
    "B_neg",
    "AB_pos",
    "AB_neg",
    "O_pos",
    "O_neg",
  ];

  // A list of compatible blood types for each blood type
  const compatibility = {
    A_pos: ["A_pos", "A_neg", "O_pos", "O_neg"],
    A_neg: ["A_neg", "O_neg"],
    B_pos: ["B_pos", "B_neg", "O_pos", "O_neg"],
    B_neg: ["B_neg", "O_pos"],
    AB_pos: [
      "A_pos",
      "A_neg",
      "B_pos",
      "B_neg",
      "AB_pos",
      "AB_neg",
      "O_pos",
      "O_neg",
    ],
    AB_neg: ["A_neg", "B_neg", "AB_neg-", "O_neg"],
    O_pos: ["O_pos", "O_neg"],
    O_neg: ["O_neg"],
  };
  return compatibility[bloodType];
}

class CompBloodUnit {
  constructor(blood, unit) {
    (this.blood = blood), (this.unit = unit);
  }
}

class HospitalandCompBlood {
  constructor(hosp, compatibleBlood) {
    (this.hosp = hosp), (this.compatibleBlood = compatibleBlood);
  }
}

class BloodType {
  constructor(A_pos, A_neg, B_pos, B_neg, O_pos, O_neg, AB_neg, AB_pos) {
    (this.A_pos = A_pos),
      (this.B_pos = B_pos),
      (this.AB_pos = AB_pos),
      (this.O_pos = O_pos),
      (this.A_neg = A_neg),
      (this.B_neg = B_neg),
      (this.AB_neg = AB_neg),
      (this.O_neg = O_neg);
  }
}
function BloodUnit(bloodbanks, Comp_Blood) {
  console.log(Comp_Blood);
  const BloodbankDetails = [];
  for (let i = 0; i < bloodbanks.length; i++) {
    const blood_bank = bloodbanks[i];
    const bloodgroup_unit = blood_bank.BloodGroup;

    let n = Comp_Blood.length;

    const bloodUnit_bloodbank = [];
    for (let j = 0; j < n; j++) {
      const CompUnit = new CompBloodUnit(
        (blood = Comp_Blood[j]),
        (unit = bloodgroup_unit[Comp_Blood[j]])
      );
      // console.log(CompUnit);
      bloodUnit_bloodbank[j] = CompUnit;
      // console.log(Comp_Blood[j]);
      // console.log(bloodgroup_unit[Comp_Blood[j]]);
    }
    const HospitalBlood = new HospitalandCompBlood(
      (hosp = blood_bank),
      (compatibleBlood = bloodUnit_bloodbank)
    );

    BloodbankDetails[i] = HospitalBlood;
  }

  return BloodbankDetails;
}

router.post("/requirement", function (req, res) {
  let bloodtype = req.body.bloodGroup;
  let city = req.body.city;

  const Comp_Blood = getCompatibleBloodTypes(bloodtype);
  BloodBank.find({ city: city }, function (err, bloodbanks) {
    if (err) {
      console.log(err);
    }

    const BloodBankDetails = BloodUnit(bloodbanks, Comp_Blood);
    console.log(BloodBankDetails);
    res.send(BloodBankDetails);
  });
});

router.post("/donor", function (req, res) {
  const donor = new Donor({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    blood_group: req.body.blood_group,
    age: req.body.age,
    city: req.body.city,
    phoneNumber: req.body.phoneNumber,
  });
  donor.save(function (err) {
    if (err) {
      console.log(err);
    }
  });
  BloodBank.find({ city: donor.city }, function (err, bloodbank) {
    console.log(bloodbank);
    res.send(bloodbank);
  });
});

router.get("/bloodBank", restrictToBloodBank, async (req, res) => {
  try {
    const RequiredBloodBank = await BloodBank.findById({ _id: req._id });
    return res
      .status(200)
      .json({ success: true, BloodUnit: RequiredBloodBank.BloodGroup });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "process failed" });
  }
});

router.post("/bloodBank/update", restrictToBloodBank, async (req, res) => {
  try {
    const blood_available = res.body;
    const blood_unit = new BloodType({
      A_pos: blood_available.A_pos,
      B_pos: blood_available.B_pos,
      AB_pos: blood_available.AB_pos,
      O_pos: blood_available.O_pos,
      A_neg: blood_available.A_neg,
      B_neg: blood_available.B_neg,
      AB_neg: blood_available.AB_neg,
      O_neg: blood_available.O_neg,
    });
    const RequiredBloodBank = await BloodBank.findByIdAndUpdate(
      { _id: req._id },
      { BloodGroup: blood_unit },
      {new:true, runValidators:true}
    );

    return res
      .status(200)
      .json({ success: true, BloodUnit: RequiredBloodBank.BloodGroup });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "process failed" });
  }
});

module.exports = router;
