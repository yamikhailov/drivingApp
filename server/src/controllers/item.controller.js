const db = require("../models")
const Item = db.item;


exports.getItems = function(req,res){
    Item.find({}, (err,items) => {
        if(err){
            res.status(400).send({message: err});
            return;
        }
        if(items.length == 0){
            res.status(404).send({message: "Items not found!"});
        }
        res.status(200).send(items);
        return;
    });
}