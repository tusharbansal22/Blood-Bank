const { string } = require("i/lib/util");
const Mongoose = require("mongoose");

const minimumLimit= function(val) {
    return val.length == 10;
}

const donorSchema = ({
    first_name: String,
    last_name:String,
    blood_group:String,
    age: Number,
    city:String,
    phone:{
        type :Number,
        index: true, unique: true,
        validate: [minimumLimit, 'Enter at least one phone number']
    }

})


const Donor = Mongoose.model("Donor", donorSchema);
module.exports = Donor;