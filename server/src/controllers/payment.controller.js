const stripe = require("stripe")("sk_test_51KptOMHxx7x5cn6b3yfn0njVIEYR5SRpVC2PuhFO5iibB4WBYwIegWFHx8Cr31D2uMie0xccx9ec0nEiST7wccFE00Qd7yOISG");
const { response } = require("express");

exports.create_session = function(req,res){
    const session =  stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
              price_data: {
                currency: 'uah',
                product_data: {
                  name: 'T-shirt',
                },
                unit_amount: 2000,
              },
              quantity: 1,
            },
          ],
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

const fullfillOrder = function(session){
    console.log("Fulfiling order : ", session);
}

exports.manage_webhook = function(req,res){
    console.log("here is tested!");
    const endpointSecret = "whsec_68af991ce23e3d3d8ebcea7a86200447dc3cb80a80590f7a678d2e623812b1ac";
    const payload = req.body;
    const sig = req.get('stripe-signature');

    let event;
  //  console.log(stripe.webhooks.constructEvent(payload,sig,endpointSecret));
    console.log(req.rawBody);
    //console.log(req.body);
    try{
        console.log("EVENT111: ", endpointSecret);
        event = stripe.webhooks.constructEvent(payload,sig,endpointSecret);
        console.log("EVENT: ", event);
    } catch(err){
        return res.status(400).send(`Webhook error: ${err.message}`);
    }
    console.log("HERES AN EXIT");
    if(event.type === 'checkout.session.completed'){
        const session = event.data.object;
        fullfillOrder(session);
    }
    res.status(200);
}