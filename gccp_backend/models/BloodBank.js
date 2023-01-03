const mongoose = require('mongoose');


const BloodTypeSchema = ({
    A_pos :{
        type:Number,
    },
    A_neg :{
        type:Number,
    },
    B_pos :{
        type:Number,
    },
    O_pos :{
        type:Number,
    },
    AB_pos :{
        type:Number,
    },
    B_neg :{
        type:Number,
    },
    O_neg :{
        type:Number,
    },
    AB_neg :{
        type:Number,
    },
  });
  

const bloodBankSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        immutable:true
    },
    password:{
        type:String,
        required:true
    },
    city: {
        type:String,
        //required:true
      },
      ContactNumber:{
        type:Number
        //required:true
      },
       BloodGroup: {
      type:BloodTypeSchema
    }
});

const BloodBank = mongoose.model('BloodBank', bloodBankSchema);

module.exports = BloodBank;
