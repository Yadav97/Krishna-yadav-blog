// custome middlewares

const validateformmiddleware = (req,res,next)=>{
    if(req.files === null || req.body.title === null || req.body.body === null || req.body.category === null || req.files.image === null)
        {
            return res.redirect("/post/new");
        }
    next();
}

module.exports = validateformmiddleware