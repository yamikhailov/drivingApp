const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const jwt = require("jsonwebtoken");


 verifyToken = function(req,res,next){
    let token = req.headers['x-access-token'];
    if (!token){
        return res.status(403).send({message: "No token provided!"});
    }
    jwt.verify(token, config.secret, (err, code) => {
        if(err){
            return res.status(401).send({message: "Unauthorized!"});
        }
        req.userId = code.id;
        next();
    });
}

 isInstructor = function(req,res,next){
    User.findById(req.userId, (err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        Role.find({_id: { $in: user.roles }}, function(err, roles){
            if(err){
                res.status(500).send({message: err});
                return;
            }
            for(let i = 0; i < roles.length; i++){
                if(roles[i].name == "instructor"){
                    next();
                    return;
                }
            }
            res.status(403).send("Instructor role is required!");
        });
    });
}

 isAdmin = function(req,res,next){
    User.findById(req.userId, (err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        Role.find({_id: { $in: user.roles }}, function(err, roles){
            if(err){
                res.status(500).send({message: err});
                return;
            }
            for(let i = 0; i < roles.length; i++){
                if(roles[i].name == "admin"){
                    next();
                    return;
                }
            }
            res.status(403).send("Admin role is required!");
        });
    });
}

const authJWT = {
    verifyToken,
    isAdmin,
    isInstructor
}

module.exports = authJWT;