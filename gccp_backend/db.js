const mongoose=require("mongoose");
const loginDB = 'mongodb://localhost:27017/GCCP';

mongoose.set('strictQuery', true);
mongoose.connect(loginDB).then(()=>{
    console.log("connection successful to DB");
}).catch((err)=>{
    console.log(err);
});