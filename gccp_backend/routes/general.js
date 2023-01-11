const express = require("express");
const router = express.Router();
const { restrictToBloodBank } = require("../middlewares");
const _ = require("lodash");
const db = require("../db");

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

function BloodUnit(bloodbanks, Comp_Blood) {
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
      bloodUnit_bloodbank[j] = CompUnit;
    }
    const HospitalBlood = new HospitalandCompBlood(
      (hosp = blood_bank),
      (compatibleBlood = bloodUnit_bloodbank)
    );

    BloodbankDetails[i] = HospitalBlood;
  }

  return BloodbankDetails;
}

router.post("/requirement", async (req, res) => {
  try {
    let bloodtype = req.body.blood_group;
    const city = _.lowerCase(req.body.city);
    const BloodBank = db.collection("bloodbanks");
    const Comp_Blood = getCompatibleBloodTypes(bloodtype);
    const snapshot = await BloodBank.where("city", "==", city).get();
    let bloodbanks = [];
    snapshot.forEach((doc) => {
      bloodbanks.push({ id: doc.id, ...doc.data() });
    });
    const BloodBankDetails = BloodUnit(bloodbanks, Comp_Blood);
    res.status(200).send(BloodBankDetails);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
});

router.post("/donor", async (req, res) => {
  try {
    const donors = db.collection("donors");
    const city = _.lowerCase(req.body.city);
    const donor = {
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      blood_group: req.body.blood_group,
      age: req.body.age,
      city: city,
      phoneNumber: req.body.phoneNumber,
    };
    await donors.add(donor);
    const BloodBank = db.collection("bloodbanks");
    const snapshot = await BloodBank.where("city", "==", city).get();
    let bloodbanks = [];
    snapshot.forEach((doc) => {
      bloodbanks.push({ id: doc.id, ...doc.data() });
    });

    res.status(200)
      .send(bloodbanks);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
});

router.get("/bloodBank", restrictToBloodBank, async (req, res) => {
  try {
    const docRef = db.collection("bloodbanks").doc(req.id);
    const doc = await docRef.get();
    const RequiredBloodBank = doc.data();
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
    const docRef = db.collection("bloodbanks").doc(req.id);
    const doc = await docRef.get();
    const BB = doc.data();
    const BloodGroup = BB.BloodGroup;
    BloodGroup[req.body.bloodGroup] = parseInt(req.body.bloodUnit);

    await db.collection("bloodbanks").doc(req.id).update({
      'BloodGroup': BloodGroup,
    });
    return res.status(200).json({ success: true, BloodUnit: BloodGroup });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "process failed" });
  }
});

module.exports = router;
