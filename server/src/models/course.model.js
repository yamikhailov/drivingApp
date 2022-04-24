const mongoose = require("mongoose");


const Course = mongoose.model("Course", new mongoose.Schema({
    isActivated: Boolean,
    isFinished: Boolean,
    lessons_passed: Number,
    scheduled_lesson: Date,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    instructor: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    
}))

module.exports = Course;