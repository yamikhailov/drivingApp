const middle = require("../middlewares");
const controller = require("../controllers/booking.controller");

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/booking/findByDay",[middle.authJWT.verifyToken], controller.findByDay);
    app.get("/api/booking/findByHour",[middle.authJWT.verifyToken], controller.findByHour);
    app.post("/api/booking/setBooking", [middle.authJWT.verifyToken,
                                         middle.verifyBooking.validateCourse,
                                         middle.verifyBooking.validateDate,
                                         middle.verifyBooking.isDateAvailable], controller.setBooking);
}