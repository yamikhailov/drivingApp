exports.allAccess = (req,res) => {
    res.status(200).send("Student/PUBLIC content");
}

exports.instructorBoard = (req,res) => {
    res.status(200).send("Instructor content");
}

exports.adminBoard = (req,res) => {
    res.status(200).send("Admin content!")
}