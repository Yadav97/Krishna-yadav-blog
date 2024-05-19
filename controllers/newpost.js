module.exports = (req,res)=>{
    if(req.session.userid)
        {

            res.render("createpost")
        }
        else
        {
            res.redirect("/signin");
        }
}