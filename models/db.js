const Mongoose = require("mongoose");


const loginDB = 'mongodb://localhost:27017/Blood-bank';

const connectDB = async () => {
  await Mongoose.connect(loginDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("MongoDB Connected")
}
module.exports = connectDB;