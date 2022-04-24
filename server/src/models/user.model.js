const mongoose = require("mongoose");
const User = mongoose.model("User",new mongoose.Schema({
    full_name: String,
    username: String,
    email: String,
    password: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ],
    image_url: String
}));

module.exports = User;