const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const app = express();
const connectDB = require("./models/db");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const {Hospital} = require("./models/model");
const {Blood_Group} = require("./models/model");
const Donor =require("./models/donormodel");

connectDB();

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
function BloodUnit(hospitals, Comp_Blood){
    const HospitalDetails = []
    for(let i=0; i<hospitals.length; i++){
        const hospital = hospitals[i];
        const bloodgroup_unit = hospital.BloodGroup;
        
        let n = Comp_Blood.length
        const bloodUnitHospital = []
        for(let j=0;j<n;j++){
            const CompUnit = new CompBloodUnit(
                blood= Comp_Blood[j],
                unit = bloodgroup_unit[Comp_Blood[j]]
            )
            bloodUnitHospital[j]=CompUnit;
            console.log(Comp_Blood[j]);
            console.log(bloodgroup_unit[Comp_Blood[j]]);
        }
        const HospitalBlood = new HospitalandCompBlood(
            hosp = hospital,
            compatibleBlood =bloodUnitHospital
        );
        HospitalDetails[i] = HospitalBlood;
    }
    return HospitalDetails
  }
  
app.get("/",function(req,res){

    res.render("index");
    
});

app.get("/donor",function(req,res){
    res.render("donor");
});

app.post("/requirement",function(req,res){
    let bloodtype = req.body.bloodtype;
    let city = req.body.city;
    const Comp_Blood = getCompatibleBloodTypes(bloodtype);
    Hospital.find({city:city},function(err,hospitals){
        if(err){
            console.log(err)
        }
        console.log(hospitals);
        const HospitalDetails = BloodUnit(hospitals,Comp_Blood);
        res.send(HospitalDetails)
    });

    
});

app.post("/donor",function(req,res){

})


  app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});
