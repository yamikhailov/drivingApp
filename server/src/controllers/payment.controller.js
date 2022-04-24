const stripe = require("stripe")("sk_test_51KptOMHxx7x5cn6b3yfn0njVIEYR5SRpVC2PuhFO5iibB4WBYwIegWFHx8Cr31D2uMie0xccx9ec0nEiST7wccFE00Qd7yOISG");
const db = require("../models/index");
const User = db.user;
const Course = db.course;
exports.create_session = function(req,res){
    let line_items = [];
    console.log("USERNAME :", req.body.username);
    items = JSON.parse(req.body.prods);
    for(let item of items){
      line_items.push({
        price_data: {
          currency: "uah",
          product_data: {
            name: item.name + " Package",
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      });
      console.log("test");
      //console.log(line_items);
    }
    const session =  stripe.checkout.sessions.create({
        metadata: {
          username: req.body.username,
          prods: req.body.prods
        },
        payment_method_types: ['card'],
        line_items: line_items,
        mode: "payment",
        success_url: "http://localhost:4200/payment/success",
        cancel_url: "http://localhost:4200/payment/fail"

    }).then(data => {
        console.log("session_id: ",data.id);
        res.send({id: data.id})
        return;
    }, err => {
        console.error(err);
    }
    );
    
}

const fullfillOrder = function(session,res){
    console.log("Fulfiling order : ", session);
    User.findOne({username: session.metadata.username},(err,user)=> {
      if(err){
        res.status(500).send({message: err});
        return;
      }
      if(!user){
        res.status(404).send({message: "User not found"});
      }
      for(let item of JSON.parse(session.metadata.prods)){
        const course =  new Course({
          isActivated: false,
          isFinished: false,
          lessons_passed: 0,
          item: item._id,
          owner: user._id,
        })
        console.log("course id : ", course._id);
        course.save(err => {
          if(err){
            res.status(400).send({message: err});
            return;
          }
          console.log("Course created!");
        })
        // create course
        // push package id
        // user.packages.push(course._id);
      }
      res.status(200).send({message: "Course(s) successfully created!"});
      return;
    });
}

exports.manage_webhook = function(req,res){
    console.log("here is tested!");
    const endpointSecret = "whsec_68af991ce23e3d3d8ebcea7a86200447dc3cb80a80590f7a678d2e623812b1ac";
    const payload = req.body;
    const sig = req.get('stripe-signature');

    let event;

    try{
        event = stripe.webhooks.constructEvent(payload,sig,endpointSecret);
    } catch(err){
        return res.status(400).send(`Webhook error: ${err.message}`);
    }
    if(event.type === 'checkout.session.completed'){
        const session = event.data.object;
        fullfillOrder(session,res);
        return;
    }
}