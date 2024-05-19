const mongoose = require("mongoose")

const user = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    name:String,
    password:{type:String,required:true},
    email:String
})

const userReg = mongoose.model("user",user)

module.exports = userReg;    
