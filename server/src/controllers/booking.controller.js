const db = require("../models/index");
const Booking = db.booking;
const Course = db.course;
const validateDate = require("validate-date");

const open_hours = 8;
const closing_time = 19;


// exports functions 
exports.findByDay = function(req,res){
    Booking.find({"course.instructor": req.course.instructor, year: req.query.year, month: req.query.month, day: req.query.day})
    .select(["hour"])
    .exec((err, results) => {
        if(err){
            res.status(400).send({message: err});
        }
        res.status(200).send(results);
    });
}

exports.createBooking = function(req,res){
    Booking.create()
}

exports.findByHour = function(req,res){
    Booking.find({year: req.query.year,month: req.query.month, day: {$gte: req.query.min, $lte: req.query.max}}, (err,bookings) => {
        if(err){
            res.status(400).send({message: err});
        }
        res.status(200).send(bookings);
    });
}

exports.setBooking = function(req,res){
        console.log("Set booking controller");
        const booking = new Booking({
            year: req.year,
            month: req.month,
            day: req.day,
            hour: req.hour,
            course: req.course_id
        });
        console.log("our booking", booking);
        booking.save(err => {
            if(err){
                res.status(400).send({message: err});
                return;
            }
            console.log("HEREEEEE");
            res.status(200).send({message: "Booking created successfully"});
            return;
        });
}

exports.isDayAvailable = function(req,res){
    Booking.find({day: req.body.day, month: req.body.month, year: req.body.year, instructor: req.course.instructor}, (err,courses) => {
        if(err){
            return res.status(400).send({message: err});
        }
        res.status(200).send(courses.map(course => course.hour));
    });
}







