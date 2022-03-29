const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dbConfig = require('./config/db.config')
const db = require("./models");


const app = express();

const port = 3000;


const Role = db.role;

db.mongoose
.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
.then(() => {
    console.log("Successfully connected to mongoDB!");
    initialize_db();
})
.catch(err => {
    console.error(err);
    process.exit();
});

function initialize_db(){
    Role.collection.estimatedDocumentCount((err,count) => {
       if(!err && count == 0){
           new Role({name: "student"}).save(err => {
            if(err){
                 console.error(err); 
            }
            console.log("added user role to collection");
        });
           new Role({name: "instructor"}).save(err => {
            if(err){
                 console.error(err); 
            }
            console.log("added moderator role to collection");
        });
           new Role({name: "admin"}).save(err => {
            if(err){
                 console.error(err); 
            }
            console.log("added admin role to collection");
        });
       } 
    })
}


// settings
app.use(helmet());
app.use(bodyParser.json());
//app.use(cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

require('./routes/auth.routes')(app); 
require('./routes/user.routes')(app);

 app.get('/',(req,res) => {
     res.send("Test the world!");
 });


 app.listen(port, ()=> {
     console.log(`Exmaple app listening on port ${port}`)
 }); 
 

 