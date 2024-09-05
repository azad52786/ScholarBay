const Razorpay = require('razorpay');

exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY , 
    key_secret: process.env.RAZORPAY_SECRET , 
    headers: {"X-Razorpay-Account": "acc_Ef7ArAsdU5t0XL"} 
});