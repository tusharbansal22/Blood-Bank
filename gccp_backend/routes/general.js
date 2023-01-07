const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { restrictToAdmin } = require("../middlewares");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const BloodBank = require("../models/BloodBank");
const BloodType = require("../models/BloodType");
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

// class BloodType {
//   constructor(A_pos, A_neg, B_pos, B_neg, O_pos, O_neg, AB_neg, AB_pos) {
//     (this.A_pos = A_pos),
//       (this.B_pos = B_pos),
//       (this.AB_pos = AB_pos),
//       (this.O_pos = O_pos),
//       (this.A_neg = A_neg),
//       (this.B_neg = B_neg),
//       (this.AB_neg = AB_neg),
//       (this.O_neg = O_neg);
//   }
// }
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
    console.log(req._id)
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
    const blood_available = req.body;
    // console.log(blood_available);
    const RequiredBloodbank = await BloodBank.findById({ _id: req._id });
    // console.log(RequiredBloodbank.BloodGroup);
    const blood = RequiredBloodbank.BloodGroup;
    // console.log(req.body);
    blood[blood_available.bloodGroup] =blood_available.unit;
    // console.log(blood_available.bloodGroup);

    var blood_unit = new BloodType({
      A_pos: RequiredBloodbank.BloodGroup.A_pos,
      B_pos: RequiredBloodbank.BloodGroup.B_pos,
      AB_pos: RequiredBloodbank.BloodGroup.AB_pos,
      O_pos: RequiredBloodbank.BloodGroup.O_pos,
      A_neg: RequiredBloodbank.BloodGroup.A_neg,
      B_neg: RequiredBloodbank.BloodGroup.B_neg,
      AB_neg: RequiredBloodbank.BloodGroup.AB_neg,
      O_neg: RequiredBloodbank.BloodGroup.O_neg,
    });
    blood_unit[blood_available] = parseInt(blood_available.unit);

    const RequiredBloodBank = await BloodBank.findByIdAndUpdate(
      { _id: req._id },
      { BloodGroup: blood_unit },
      
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
