const { string } = require("i/lib/util");
const Mongoose = require("mongoose");

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

const HospitalSchema =({
    username: {
      type: String,
     
      required: true
    },
    password: {
      type: String,
      minlength: 6,
      //required: true,
    },
    Mail_ID:{
      type:String,
      trim:true,
      lowercase:true,
     
      //required:true,
      
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      immutable:true
  
    },
    ContactNumber:{
      type:Number,
      length:10,
      required:true
    },
    address:{
      type:String
    },
    BloodGroups: {
        type:BloodTypeSchema
    }
  });


const Hospital = Mongoose.model("Hospital", HospitalSchema);
const blood_group = Mongoose.model("Blood_Group", BloodTypeSchema);
module.exports = Hospital;