const express = require("express");
const path = require("path")
const ejs = require("ejs")
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const blogpost =require("./models/blogpost")
const fileupload = require("express-fileupload")
const expressSession = require("express-session");


// importin all controllers
const newpost = require("./controllers/newpost")
const homepage = require("./controllers/home")
const storenewuser = require("./controllers/storenewuser")
const userlogincontroller = require("./controllers/signinuser")




// imports the middlewares 
const validateformmiddleware = require("./middlewares/validateformmiddleware")


const app = express()


app.use(express.static("public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(expressSession({
    secret:"keyboard is the cat"
}))


app.set("view engine","ejs")

app.use(fileupload())


// // custome middlewares -- see middleware folder

// const validateFormMiddleware = (req,res,next)=>{
//     if(req.files === null || req.body.title === null || req.body.body === null || req.body.category === null || req.files.image === null)
//         {
//             return res.redirect("/post/new");
//         }
//     next();
// }

app.use("/posts/store",validateformmiddleware);// custome middlewares










// with the templating engines

// app.get("/",(req,res)=>{
//     res.render("index")
// })

// now display the all the blogposts on the homepage
app.get("/",homepage );


// ----------------no need to make controllers for that cause no big codebase
app.get("/about",(req,res)=>{
    res.render("about")
})


app.get("/signup",redirectifauthenticated,(req,res)=>{
res.render("signup")
})


// when user clicks on register button in signup page
app.post("/user/register",redirectifauthenticated,storenewuser)






app.get("/signin",(req,res)=>{
    res.render("signin")
})


app.post("/user/signin",userlogincontroller);




// ----------------------------------------------------------------------


// app.get("/post/new",(req,res)=>{
//     res.render("createpost")
// })
app.get("/post/new",newpost);



// single post seeing

app.get("/post/:id",async (req,res)=>{
    console.log(req.params.id)
    const singlepost = await blogpost.findById(req.params.id) 
    res.render("post",{singlepost})
    console.log(singlepost.imagepath)
})

// submitting the form data 

// app.post("/posts/store",(req,res)=>{
//     console.log(req.body)
//     res.redirect("/")
//     res.end("data is stored")
// })

// store the form data or post in db

app.post("/posts/store",(req,res)=>{
    let uploadimg = req.files.image;
    // console.log("req.body val --> ",req.body)
    // console.log(req.files)
    uploadimg.mv(path.resolve(__dirname,"public/img",uploadimg.name),async (error)=>{

        await blogpost.create({...req.body,imagepath:"/img/" + uploadimg.name})    
        res.redirect("/")
        console.log();
    });
    
})


// creating our own custom middlewares demo

// const customeMiddle = (req,res,next)=>{
//     console.log("custom middleware is called");
//     next();
// }
// register the cutsome middleware
// app.use(customeMiddle);


// mongoose related stuff


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/kr-db');
  console.log("hey database is connected")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}







// this below code gives the html files without the templating engine 
// app.get("/",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"pages/index.html"))
// })

// app.get("/about",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"pages/about.html"))
// })


// app.get("/signup",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"pages/signup.html"))
// })

// app.get("/signin",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"pages/signin.html"))
// })

const server = "http://localhost:8000"
app.listen(8000,()=>{
    console.log("app is running on",server)

})


