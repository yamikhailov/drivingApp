const mongoose = require("mongoose");
const db = {};
db.mongoose = mongoose;
db.user = require('./user.model');
db.role = require('./role.model');
db.item = require('./item.model');
db.ROLES = ["student","instructor","admin"];
module.exports = db;