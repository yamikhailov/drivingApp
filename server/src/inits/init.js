const db = require('../models')
const bcrypt = require("bcryptjs");

const admin_username = "admin";
const admin_password = "adminadmin";

const Role = db.role;
const Item = db.item;
const User = db.user;
exports.initialize_roles = function(){
Role.collection.estimatedDocumentCount((err,count) => {
    if(!err && count == 0){
        console.log("Initializing roles: ");
        new Role({name: "student"}).save(err => {
         if(err){
              console.error(err); 
         }
         console.log("added user role to collection");
     });
        new Role({name: "instructor"}).save(err => {
         if(err){
              console.error(err); 
         }
         console.log("added moderator role to collection");
     });
        new Role({name: "admin"}).save(err => {
         if(err){
              console.error(err); 
         }
         console.log("added admin role to collection");
     });
    } 
 })
}

exports.initialize_items = function(){
     Item.collection.estimatedDocumentCount((err,count) => {
          if(!err && count == 0){
              new Item({
                  name: "Експресс",
                  price: 7000,
                  img_url: "https://i.imgur.com/dCtMkGx.jpeg",
                  description: "Get your license as soon as possible",
                  theory_hours: 60,
                  lessons: 100
              }).save(err => {
                  if(err){
                      console.error(err);
                      return;
                  }
                  console.log("Express Packages was added!")
              });
  
              new Item({
                  name: "Стандарт",
                  price: 10000,
                  img_url: "https://i.imgur.com/IyEp7mf.jpeg",
                  description: "Standard most popular package",
                  theory_hours: 80,
                  lessons: 150
              }).save(err => {
                  if(err){
                      console.error(err);
                      return;
                  }
                  console.log("Standard Package was added!")
              });
  
              new Item({
                  name: "Профі",
                  price: 15000,
                  img_url: "https://i.imgur.com/xyl4Bme.jpeg",
                  description: "Professional package for advanced drivers",
                  theory_hours: 100,
                  lessons: 200
              }).save(err => {
                  if(err){
                      console.error(err);
                      return;
                  }
                  console.log("Professional Package was added!")
              });
  
          }
      })
}

exports.initialize_admin = function(){
    User.collection.estimatedDocumentCount((err,count) => {
        if(!err && count == 0){
            Role.findOne({name: "admin"}, (err,role) => {
                new User({
                    username: "admin",
                    email: "admin@gmail.com",
                    password: bcrypt.hashSync(admin_password, 8),
                    roles: [role._id],
                    image_url: "https://icon-library.com/images/icon-admin/icon-admin-18.jpg"
                }).save(err => {
                    if(err){
                        console.error(err);
                        return;
                    }
                    console.log("Admin was added!");
                });
            });

        }
    });
}