const Mongoose = require("mongoose");
const { string } = require("i/lib/util");


const donorSchema = ({
    first_name: String,
    last_name:String,
    blood_group:String,
    age: Number,
    city:String,
    phoneNumber:{
        type :Number,
        index: true,
        unique: true
    }

});


const Donor = Mongoose.model("Donor", donorSchema);
module.exports = Donor;