const db = require("../models/index");
const Booking = db.booking;
const Course = db.course;
const validateDate = require("validate-date");

const open_hours = 8;
const closing_time = 19;


// exports functions 
exports.findByDay = function(req,res){
    Booking.find({year: req.query.year, month: req.query.month, day: req.query.day})
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
    Course.find({_id: req.body.course_id}, (err, course) => {
        if(err){
            return res.status(400).send({message: err});
        }
        if(cour)
        if(course.owner != req.userId || !course.isActivated){
            res.status(403).send({message: "Not Authorized to create booking!"})
            return;
        }
        const ourdate = ('0' + req.body.day).slice(-2) + '/' + ('0' + req.body.month).slice(-2) + '/' + req.body.year;
        if(!validateDate(ourdate,responseType="boolean", dateFormat="dd/mm/yyyy")){
            res.status(400).send({message: "Invalid date!"})
        }
        if(req.body.hour < open_hours || req.body.hour > closing_time){
            res.status(400).send({message: "Invalid working hours!"});
        }
        
        const booking = new Booking({
            year: req.body.year,
            month: req.body.month,
            day: req.body.day,
            hour: req.body.hour,
            course: req.body.course_id
        });
        booking.save(err => {
            if(err){
                res.status(400).send({message: err});
                return;
            }
            return res.status(200).send({message: "Booking created successfully"});
        });
    })
}





// local functions

function validate_date(year,month,day,hour){
    let cur_date = new Date();
        // if(year < cur_date.getFullYear ||
        // month  < cur_date.getMonth  ||){
        
        //   }
}


