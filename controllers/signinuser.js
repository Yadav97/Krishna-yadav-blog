const userReg = require("../models/user");

module.exports = (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log("username and password ---> ",username,password);
    userReg.findOne({username:username})
    .then((user)=>{
        if(user)
        {
                console.log("user is found",user);
                if (password === user.password){
                    console.log("password match");
                    req.session.userid = user._id;
                    res.redirect("/")
                }
                else{
                    console.log("password is not matched");
                    res.redirect("/signin")
                }
        }
        else{
            console.log("user is not found");
            res.redirect("/signin")
        }
    }).catch((error)=>{
        console.log("user is not found")
        console.log("error comin while login",error);
    })





}