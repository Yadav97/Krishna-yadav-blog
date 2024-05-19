const blogpost = require("../models/blogpost")


module.exports  = async (req,res)=>{
    console.log("wait for list loaded from Db")
    const dta = await blogpost.find()
    // res.render("index")
    // const dta = [{title:"this is the title",body:"this is the body"},{title:"2ns title",bosy:"2nd body"}   ]
    console.log(dta)
    res.render("home",{dta:dta});

}
