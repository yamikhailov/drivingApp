const mongoose = require("mongoose");

const Item = mongoose.model("Item", new mongoose.Schema({
    name: String,
    price: Number,
    img_url: String,
    description: String,
    theory_hours: Number,
    lessons: Number
}));

module.exports = Item;