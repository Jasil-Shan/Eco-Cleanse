import Razorpay from 'razorpay'
import crypto from 'crypto'
import BookingModel from '../model/bookingModel.js';


const instance = new Razorpay({

    key_id: 'rzp_test_X2EWEu9JQG1E2R',
    key_secret: 'KALo71knuY2gnsnEv6aBNjEM',

});


export async function createPayment(req, res) {

    const options = {
        amount: 25000,
        currency: "INR",
    };

    const order = await instance.orders.create(options)
    res.status(200).json({ success: true, order })

}


export async function paymentVerification(req, res) {

    const {response , garbage, payment} = req.body
    const order_id = response.razorpay_order_id
    const razorpay_payment_id = response.razorpay_payment_id
    const razorpay_signature = response.razorpay_signature;
    const secret = "KALo71knuY2gnsnEv6aBNjEM"; // Replace this with your actual secret key

    const generated_signature = generateHmacSHA256(order_id + "|" + razorpay_payment_id, secret);
    console.log(req.body,"sjdsghj");

    if (generated_signature === razorpay_signature) {

        res.json({ success: true});
        console.log('payment success');
    }

}

function generateHmacSHA256(data, secret) {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(data);
    return hmac.digest('hex');
}



