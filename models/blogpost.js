const mongoose = require("mongoose")

const blogpostschema = new mongoose.Schema({
    title:String,
    body:String,
    category:String,
    imagepath:String,  
    dateposted:{
        type:Date,
        default:new Date()},
})

const blogpost = mongoose.model("blogpost",blogpostschema)

module.exports = blogpost;    
