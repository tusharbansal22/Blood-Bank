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
  
  const BloodType = mongoose.model("BloodType", BloodTypeSchema);

module.exports = BloodType;
