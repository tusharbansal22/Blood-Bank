const mongoose=require("mongoose");
const loginDB = 'mongodb+srv://riya:sairam@cluster0.rvezflz.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);
mongoose.connect(loginDB).then(()=>{
    console.log("connection successful to DB");
}).catch((err)=>{
    console.log(err);
});