const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const app = express();
const connectDB = require("./models/db");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const hospital = require("./models/model");
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
class hospitalDetail{
    constructor(){

    }
}

function showBloodUnit(hospitals, Comp_Blood){
    for(let i=0; i<hospitals.length; i++){
        let hospital = hospitals[i];
        for(let j=0;j<Comp_Blood.length;j++){
            let 
        }
    }
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

    let hospitals=hospital.find({city:city});
    let Comp_Blood = getCompatibleBloodTypes(bloodtype);

    console.log(hospitals[0]);
    showBloodUnit(hospitals,Comp_Blood);
    res.send()
});

app.post("/donor",function(req,res){

})


  app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});
