const express = require('express');
const bodyParser = require("body-parser");
const router=express.Router();

const Admin = require("../models/Admin");
const BloodBank = require("../models/BloodBank");
const Donor = require("../models/Donor");

function getCompatibleBloodTypes(bloodType) {
    // A list of all possible blood types
    const allBloodTypes = ['A_pos', 'A_neg', 'B_pos', 'B_neg', 'AB_pos', 'AB_neg', 'O_pos', 'O_neg'];
  
    // A list of compatible blood types for each blood type
    const compatibility = {
      'A_pos': ['A_pos', 'A_neg', 'O_pos', 'O_neg'],
      'A_neg': ['A_neg', 'O_neg'],
      'B_pos': ['B_pos', 'B_neg', 'O_pos', 'O_neg'],
      'B_neg': ['B_neg', 'O_pos'],
      'AB_pos': ['A_pos', 'A_neg', 'B_pos', 'B_neg', 'AB_pos', 'AB_neg', 'O_pos', 'O_neg'],
      'AB_neg': ['A_neg', 'B_neg', 'AB_neg-', 'O_neg'],
      'O_pos': ['O_pos', 'O_neg'],
      'O_neg': ['O_neg']
    };
    return compatibility[bloodType];
}

class CompBloodUnit{
    constructor(blood,unit){
        this.blood=blood,
        this.unit=unit
    }
}

class HospitalandCompBlood{
    constructor(hosp,compatibleBlood){
        this.hosp = hosp,
        this.compatibleBlood = compatibleBlood
    }
}

function BloodUnit(bloodbanks, Comp_Blood){

    const BloodbankDetails = [];
    for(let i=0; i<bloodbanks.length; i++){
        const blood_bank = bloodbanks[i];
        const bloodgroup_unit = blood_bank.BloodGroup;
    
        let n = Comp_Blood.length;
        
        const bloodUnit_bloodbank = []
        for(let j=0;j<n;j++){
            const CompUnit = new CompBloodUnit(
                blood= Comp_Blood[j],
                unit = bloodgroup_unit[Comp_Blood[j]]
            )
            console.log(CompUnit);
            bloodUnit_bloodbank[j]=CompUnit;
            console.log(Comp_Blood[j]);
            console.log(bloodgroup_unit[Comp_Blood[j]]);
        }
        const HospitalBlood = new HospitalandCompBlood(
            hosp = blood_bank,
            compatibleBlood = bloodUnit_bloodbank
        );

        BloodbankDetails[i] = HospitalBlood;
    }
   
    return BloodbankDetails

  }
  


router.post("/requirement",function(req,res){

    let bloodtype = req.body.blood_group;
    let city = req.body.city;
    
    const Comp_Blood = getCompatibleBloodTypes(bloodtype);
    BloodBank.find({city:city},function(err,bloodbanks){
        if(err){
            console.log(err);
        }
        console.log(bloodbanks);
        const BloodBankDetails = BloodUnit(bloodbanks,Comp_Blood);
        res.send(BloodBankDetails);
    });
  
});

router.post("/donor",function(req,res){

    phone_number = res.body.phoneNumber;
    if(CheckPhoneNumber(phone_number)){
    const donor = new Donor({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        blood_group:req.body.blood_group,
        age:req.body.age,
        city:req.body.city,
        phoneNumber:req.body.phoneNumber
    });
    donor.save(function(err){
        if(err){
            console.log(err);
        }
    });
    BloodBank.find({city:donor.city},function(err,bloodbank){
        res.send(bloodbank);
    });
}
else{
    res.send();
}

});

router.post("/:bloodBank",function(req,res){

});
module.exports=router;