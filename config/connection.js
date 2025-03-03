const mongoose = require("mongoose");

async function connection(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected");
    } catch(err){
        console.log(err);
    }
}

module.exports = connection;