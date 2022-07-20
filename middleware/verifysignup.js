
const db = require("../models")
const ROLES = db.ROLES;
const User = db.user;

chekDuplicateUsernameOrEmail = (req,res,next) => {
    User.findOne({
        username:req.body.username
    }).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(user){
            res.status(400).send({message:"Faliled!Username is already in use!..."})
            return;
        }
        // Email
        User.findOne({
            email:req.body.email
        }).exec((err,user)=>{
            if(err){
                res.status(500).send({message:err});
                return;
            }
            if(user){
                res.status(400).send({message:"Failed"})
            }
            next();
        })
    })
}

checkRolesExisted = (req,res,next) =>{
    if(req.body.roles){
        for(i=0;i<req.body.roles.length;i++){
            if(!ROLES.includes(req.body.roles[i])){  
                res.status(400).send({
                    message:`faliled Role ${req.body.roles[i]} does not exist`
                })    
                return;
            }
        }
    }
    next();
};
const verifySignUp = {
    chekDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp