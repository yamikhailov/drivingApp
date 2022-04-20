const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dbConfig = require('./config/db.config')
const db = require("./models");

const init = require("./inits/init")
const app = express();

const port = 3000;

const Item = db.item;
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
    // default init
    init.initialize_roles();
    init.initialize_items();
    init.initialize_admin();
 
}


// settings
app.use(helmet());
app.use('/payment/webhook', express.raw({type: "*/*"}));
//app.use(cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

require('./routes/auth.routes')(app); 
require('./routes/user.routes')(app);
require('./routes/payment.routes')(app);

 app.get('/',(req,res) => {
     res.send("Test the world!");
 });


 app.listen(port, ()=> {
     console.log(`Exmaple app listening on port ${port}`)
 }); 
 

 