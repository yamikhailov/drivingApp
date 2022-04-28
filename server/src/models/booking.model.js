const mongoose = require("mongoose");

const Booking = mongoose.model("Booking", new mongoose.Schema({
    year: Number, 
    month: Number,
    day: Number,
    hour: Number,
    course:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }
}));


module.exports = Booking;