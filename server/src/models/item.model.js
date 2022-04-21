const mongoose = require("mongoose");

const Item = mongoose.model("Item", new mongoose.Schema({
    name: String,
    price: Number,
    img_url: String,
    description: String,
    lessons: Number
}));

module.exports = Item;