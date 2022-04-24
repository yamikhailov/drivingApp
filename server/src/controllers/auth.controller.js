const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const Role = db.role;
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

exports.signup = function(req,res){
    const user = new User({
        full_name: req.body.full_name,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        packages: [],
        image_url: "https://png.pngtree.com/png-vector/20190116/ourlarge/pngtree-vector-male-student-icon-png-image_322034.jpg"
    })

    user.save(function(err, user){
        if(err){
            res.status(500).send({message: err});
            return;
        }
        // if roles are provided
        if(req.body.roles){
            Role.find({name: {$in: req.body.roles}}, function(err,roles){
                if(err){
                    res.status(500).send({message: err});
                    return;
                }
                user.roles = roles.map(role => role._id);
                user.save(function(err){
                    if(err){
                        res.status(500).send({message: err});
                        return;
                    }
                    res.status(200).json({ok: true, message: "User successfully created!"});
                    return;

                });
            });
        }
        //standard role 
        else {
            Role.findOne({name: "student"}, function(err,role){
                if(err){
                    res.status(500).send({message: role});
                    return;
                }
                user.roles = [role._id];
                user.save(function(err){
                    if(err){
                        res.status(500).send({message: err});
                        return;
                    }
                    res.status(200).json({ok: true, message: "User successfully created!"});
                    return;
                });
            });
        }

    })
}

exports.signin = function(req,res){
    User.findOne({username: req.body.username})
    .populate("roles","-__v")
    .exec(function(err, user){
        if(err){
            res.status(500).send({message: err});
            return;
        }
        if(!user){
            res.status(404).send({message: "User not found!"});
            return;
        }
        let isValid = bcrypt.compareSync(req.body.password,user.password);
        if(!isValid){
            return res.status(401).send({accessToken: null, message: "Invalid Password!"});
        }    
        let token = jwt.sign({id: user.id}, authConfig.secret, {expiresIn: 3600});
        let authRoles = [];
        for(let i = 0; i < user.roles.length; i++){
            authRoles.push(user.roles[i].name);
        }
        res.status(200).send({
            id: user._id,
            full_name: user.full_name,
            username: user.username,
            email: user.email,
            roles: authRoles,
            image_url: user.image_url,
            accessToken: token
        })
    })
}

exports.updateUser = function(req,res){
    console.log("here");
    User.findByIdAndUpdate(req.userId, req.body,{new: true}, (err,output) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send(output);
        return;
    });
}