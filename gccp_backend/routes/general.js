// import { donors, doc, setDoc } from "firebase/firestore";
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { restrictToBloodBank } = require("../middlewares");
const _ = require("lodash");
// import { donors, doc, setDoc } from "firebase/firestore"; 
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

router.post("/requirement",async(req, res)=> {



try{
  let bloodtype = req.body.blood_group;
  let city = req.body.city;

  const BloodBank = db.collection('bloodbanks');
  const Comp_Blood = getCompatibleBloodTypes(bloodtype);
  

  // BloodBank.find({ city: city }, function (err, bloodbanks) {
  //   if (err) {
  //     console.log(err);
  //   }
  const bloodbanks = await BloodBank.where('city', '==', city).get();

    const BloodBankDetails = BloodUnit(bloodbanks, Comp_Blood);
    console.log(BloodBankDetails);
    res
    .cookie('BloodBankDeatils',BloodBankDetails)
    .send(BloodBankDetails)

  }catch(error){
    console.log(error);
    return res
    .status(500)
    .json({ success: false, message: "internal sever error" });
  }});


  router.get("/requirement",async(req, res)=> {



    try{
      let bloodtype = req.body.blood_group;
      let city = req.body.city;
    
      const BloodBank = db.collection('bloodbanks');
      const Comp_Blood = getCompatibleBloodTypes(bloodtype);
      
    
      // BloodBank.find({ city: city }, function (err, bloodbanks) {
      //   if (err) {
      //     console.log(err);
      //   }
      const bloodbanks = await BloodBank.where('city', '==', city).get();
    
        const BloodBankDetails = BloodUnit(bloodbanks, Comp_Blood);
        console.log(BloodBankDetails);
        res
        .cookie('BloodBankDeatils',BloodBankDetails)
        .send(BloodBankDetails)
    
      }catch(error){
        console.log(error);
        return res
        .status(500)
        .json({ success: false, message: "internal sever error" });
      }});
    

// router.get("/requirement", function (req, res) {
//   let bloodtype = req.body.blood_group;
//   let city = req.body.city;

//   const Comp_Blood = getCompatibleBloodTypes(bloodtype);
//   BloodBank.find({ city: city }, function (err, bloodbanks) {
//     if (err) {
//       console.log(err);
//     }

//     const BloodBankDetails = BloodUnit(bloodbanks, Comp_Blood);
//     console.log(BloodBankDetails);
//     res.send(BloodBankDetails);
//   });
// });

router.post("/donor", async (req, res)=> {
try{

  const donors = db.collection('donors');
  const donor = {
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    blood_group: req.body.blood_group,
    age: req.body.age,
    city: req.body.city,
    phoneNumber: req.body.phoneNumber,
  };
  const d = await donors.add(donor);
  const BloodBank = db.collection('bloodbanks');
  const bloodbanks = await BloodBank.where('city', '==', req.body.city).get();
    
  
    res.cookie('bloodbank',{bloodbanks}, {
      httpOnly: true,
    }).send(bloodbanks)
  
}catch(error){
  console.log(error);
  return res
  .status(500)
  .json({ success: false, message: "internal sever error" });
}
});

router.get("/donor", async (req, res)=> {
  
  const bbs  = req.cookies;
  console.log(bbs)
  return bbs;
});

router.get("/bloodBank", restrictToBloodBank, async (req, res) => {
  try {
    const BloodBank = db.collection('bloodbanks');
    console.log(req.id);
    const id = req.id;
    const RequiredBloodBank = await BloodBank.where('id', '==',id ).get();
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
    const BloodBank = db.collection('bloodbanks');
    const RequiredBloodBank = await BloodBank.where('id', '==',id ).get();

    const blood = RequiredBloodBank.BloodGroup;
    blood[blood_available.bloodGroup] =blood_available.unit;

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

    const RequiredBloodBank2 = await BloodBank.where('id', '==',id ).get();

    return res
      .status(200)
      .json({ success: true, BloodUnit: RequiredBloodBank.BloodGroup });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "process failed" });
  }
});

module.exports = router;
