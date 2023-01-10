// import { donors, doc, setDoc } from "firebase/firestore";
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { restrictToBloodBank } = require("../middlewares");
const _ = require("lodash");
// import { donors, doc, setDoc } from "firebase/firestore"; 
const db = require("../db");

const BloodType = require("../models/BloodType")
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
  
  let BBs = [];
  // BloodBank.find({ city: city }, function (err, bloodbanks) {
  //   if (err) {
  //     console.log(err);
  //   }
  const bloodbanks = await BloodBank.where('city', '==', city).get();
  var i =0;
  bloodbanks.forEach(doc => {

    BBs[i] = doc.data();
    i++;
 
  });

    const BloodBankDetails = BloodUnit(BBs, Comp_Blood);
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
      let city = _.lowerCase(req.body.city);
    
      const BloodBank = db.collection('bloodbanks');
      const Comp_Blood = getCompatibleBloodTypes(bloodtype);
      
    
      // BloodBank.find({ city: city }, function (err, bloodbanks) {
      //   if (err) {
      //     console.log(err);
      //   }
      const bloodbanks = await BloodBank.get();
      
        const BloodBankDetails = BloodUnit(bloodbanks, Comp_Blood);
       
        console.log(bloodbanks.data);
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
  
  const city = req.body.city
  console.log(req.body)
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
  const bloodbanks = await BloodBank.where('city', '==', city).get();
    let BBs = [];
  var i =0;
  bloodbanks.forEach(doc => {

    BBs[i] = doc.data();
    i++;
    console.log(doc.data())
 
  });

    res.cookie('bloodbank',{BBs}, {
      httpOnly: true,
    }).send(BBs)
  
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
    
    const id = req.id;
    const RequiredBloodBank = await BloodBank.doc(id).get();
    console.log(RequiredBloodBank.data())
 
   const BB = RequiredBloodBank.data();
     
 
    return res
      .status(200)
      .json({ success: true, BloodUnit:BB.BloodGroup});
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "process failed" });
  }
});

router.post("/bloodBank/update", restrictToBloodBank, async (req, res) => {
  try {
    const blood_available = req.body;
    const BloodBank = db.collection('bloodbanks');
    const id = req.id;
    const RequiredBloodBank = await BloodBank.doc(id).get();
   
    const BB = RequiredBloodBank.data();
    // const blood = BB.BloodGroup;
    // console.log(blood[blood_available.bloodGroup])
      
 
    var blood_unit = new BloodType({
      A_pos:BB.BloodGroup.A_pos,
      B_pos: BB.BloodGroup.B_pos,
      AB_pos: BB.BloodGroup.AB_pos,
      O_pos: BB.BloodGroup.O_pos,
      A_neg: BB.BloodGroup.A_neg,
      B_neg: BB.BloodGroup.B_neg,
      AB_neg: BB.BloodGroup.AB_neg,
      O_neg: BB.BloodGroup.O_neg,
    });
    blood_unit[blood_available.BloodGroup] = parseInt(blood_available.unit);
    
    db.collection('bloodbanks').doc(id).update({
      'BloodGroup.A_pos' : blood_unit.A_pos,
      'BloodGroup.B_pos': blood_unit.B_pos,
      'BloodGroup.AB_pos': blood_unit.AB_pos,
      'BloodGroup.O_pos': blood_unit.O_pos,
      'BloodGroup.A_neg': blood_unit.A_neg,
      'BloodGroup.B_neg': blood_unit.B_neg,
      'BloodGroup.AB_neg': blood_unit.AB_neg,
      'BloodGroup.O_neg': blood_unit.O_neg
    
    })
   
    return res
      .status(200)
      .json({ success: true, BloodUnit:BB.BloodGroup });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "process failed" });
  }
});

module.exports = router;
