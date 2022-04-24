const db = require("../models/index");
const Course = db.course;

exports.getCourses =  function(req,res){
    Course.find({owner: req.userId})
          .populate("owner", "username -_id")
          .populate("instructor", "full_name username -_id")
          .populate("item")
          .exec((err,courses) => {
        if(err){
            res.status(400).send({message: err});
        }
        res.status(200).send(courses);
    });
}