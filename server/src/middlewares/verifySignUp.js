const db = require("../models")
const User = db.user;
const ROLES = db.ROLES;

checkDuplicateUsernameOrEmail = function(req,res,next){
    //check for username duplicate
    User.findOne({username: req.body.username}).exec(function(err,user){
        if(err){
            res.status(500).send({message: err});
            return;
        }
        if(user){
            res.status(400).send({message: "USERNAME is already exists!"});
            return;
        }

        User.findOne({email: req.body.email}).exec(function(err,user){
            if(err){
                res.status(500).send({message: err});
                return;
            }
            if(user){
                res.status(400).send({message: "EMAIL is already exists!"});
                return;
            }
            next();
        });
    });

    
}

checkRolesExist = function(req,res,next){
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({message: `ROLE{${req.body.roles[i]}} is not found!`});
                return;
            }
        }    
    }
    next();
}


test_stuff = function(req,res,next){
    if(1){
        res.status(400).send({message: "THIS SHIT IS NOT WORKING!"});
        return;
    }
    next()
}


const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExist
}

module.exports = verifySignUp;