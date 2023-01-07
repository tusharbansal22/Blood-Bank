const mongoose = require("mongoose");

const BloodTypeSchema = {
  A_pos: {
    type: Number,
    default: 0,
  },
  A_neg: {
    type: Number,
    default: 0,
  },
  B_pos: {
    type: Number,
    default: 0,
  },
  O_pos: {
    type: Number,
    default: 0,
  },
  AB_pos: {
    type: Number,
    default: 0,
  },
  B_neg: {
    type: Number,
    default: 0,
  },
  O_neg: {
    type: Number,
    default: 0,
  },
  AB_neg: {
    type: Number,
    default: 0,
  },
};

const bloodBankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    immutable: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    // required:true
  },
  ContactNumber: {
    type: Number,
    //required:true
  },
  BloodGroup: {
    type: BloodTypeSchema
  },
});

const BloodBank = mongoose.model("BloodBank", bloodBankSchema);

module.exports = BloodBank;
