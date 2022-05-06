const controller = require("../controllers/course.controller");
const middle = require("../middlewares/index");



module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/course/getCourses", [middle.authJWT.verifyToken], controller.getCourses);
   // app.post("/api/course/setInstructor", [middle.authJWT.verifyToken], controller.setInstructor);
}