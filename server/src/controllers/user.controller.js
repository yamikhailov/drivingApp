const db = require("../models");
const User = db.user;


exports.allAccess = (req,res) => {
    res.status(200).send("Student/PUBLIC content");
}

exports.instructorBoard = (req,res) => {
    res.status(200).send("Instructor content");
}

exports.adminBoard = (req,res) => {
    res.status(200).send("Admin content!")
}

exports.getUser = function(req,res){
    User.findOne({username: req.query.username})
        .populate("roles packages","-__v -_id")
        .exec((err,user) => {
        if(err){
            res.status(500).send({message: "Internal Error"});
            return;
        }
        if(!user){
            res.status(404).send({message: "User not found!"});
            return;
        }
        res.status(200).send({
            username: user.username,
            email: user.email,
            roles: user.roles,
            packages: user.packages,
            image_url: user.image_url
        });
    });
}