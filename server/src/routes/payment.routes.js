const middle = require("../middlewares/index");
const controller = require("../controllers/payment.controller");
const bodyParser = require('body-parser');
module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/payment/create-checkout", [middle.authJWT.verifyToken], controller.create_session);
    //app.post("/payment/webhook", [bodyParser.raw({type: 'application/json'})],  controller.manage_webhook);
    app.post("/payment/webhook",  controller.manage_webhook);
}