const db = require("../models");
const User = db.user;
const Role = db.role;
const Course = db.course;

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
            image_url: user.image_url
        });
    });
}

exports.getInstructors = (req,res) => {
    Role.findOne({name: "instructor"}, (err,role) => {
        if(err){
            res.status(400).send({message: err});
            return;
        }
        User.find({roles: [role._id]}).select(["full_name","username","image_url","-_id"]).exec((err, users) => {
            if(err){
                res.status(400).send({message: err});
            }
            res.status(200).send(users);
        });  
    });
}


exports.setInstructor = (req,res) => {
    Course.findOne({_id: req.body.course._id}, (err, course) => {
        if(err){
            res.status(400).send({message: err});
            return;
        }
        User.findOne({username: req.body.inst.username}, (err,inst) => {
            if(err){
                res.status(400).send({message: err});
                return;
            }
            if(inst){
                course.isActivated = true;
                course.instructor = inst._id;
                course.save(err => {
                    if(err){
                        res.status(400).send({message: err});
                        return
                    }
                    res.status(200).send({message: "ok"});
                    return;
                })
            } else {
                res.status(404).send({message: "Instructor is not found"});
                return;
            }
        })
    })
}