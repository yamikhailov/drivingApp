const VD = require("validate-date");
const db = require("../models/index");
const Booking = db.booking;
const Course = db.course;
const work_from  = 8;
const work_to = 18


validateCourse = function(req,res,next){
    console.log("validateCourse checking");
    Course.findOne({_id: req.body.course_id}, (err,course) => {
       if(err){
            res.status(400).send({message: err});
            return;
       }
       if(req.userId != course.owner){
            res.status(400).send({message: "Course does not belong to the user!"});
            return;
       }
       req.course = course;
       next();
    });
}

validateDate = function(req,res,next){
    console.log("validateDate checking");
    const ourdate = ('0' + req.body.day).slice(-2) + '/' + ('0' + req.body.month).slice(-2) + '/' + req.body.year;
    if(!VD(ourdate,responseType="boolean", dateFormat="dd/mm/yyyy")){
        res.status(400).send({message: "Invalid date!"});
        return;
    }
    if(!isNumber(req.body.hour) || req.body.hour < work_from || req.body.hour > work_to){
        res.status(400).send({message: "Working hour is not correct!"});
        return;
    }
    req.year = req.body.year;
    req.month = req.body.month;
    req.day = req.body.day;
    req.hour = req.body.hour;
    next();
}

isDateAvailable = function(req,res,next){
    console.log("isDateAvailable checking");
   Booking.findOne({year: req.year, month: req.month, day: req.day, hour: req.hour}, (err,booking) => {
    if(err){
        res.status(400).send({message: err});
        return;
    }
    if(booking){
        res.status(400).send({message: "Booking is already exists!"});
        return;
    }
    next();
   }); 
}

// local functions

isNumber = function(num){
    if(num >= 0 && num <= 24){
        return true;
    }
    return false;
}
const verifyBooking = {
    validateDate,
    isDateAvailable,
    validateCourse
}

module.exports = verifyBooking;