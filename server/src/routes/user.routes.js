const controller = require("../controllers/user.controller");
const middle = require("../middlewares");
module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
      
    app.get("/api/test/all", controller.allAccess);
    app.get("/api/test/instructor", [middle.authJWT.verifyToken, middle.authJWT.isInstructor], controller.instructorBoard);
    app.get("/api/test/admin", [middle.authJWT.verifyToken, middle.authJWT.isAdmin], controller.adminBoard);
    // get another user
    app.get("/api/getUser",[middle.authJWT.verifyToken], controller.getUser);
    // needs to be constructed 
    app.get("/api/getInstructors", [middle.authJWT.verifyToken], controller.getInstructors);
    app.post("/api/setInstructor", [middle.authJWT.verifyToken], controller.setInstructor);
}