const userReg = require("../models/user");
const path = require("path")


module.exports = (req,res)=>{
    userReg.create({...req.body}).then((user)=>{
        console.log("user is created",user);
        res.redirect("/")
    }).catch((error)=>{
        if (error)
            {
                console.log("error occur in creating user",error);
                return res.redirect("/signup");
            }
    })
    console.log("req.body ----> ", req.body)  




}