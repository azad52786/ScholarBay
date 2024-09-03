import { toast } from "react-hot-toast";
import Apiconnection from "../Apiconnection";
import { PAYMENT_API } from "../Api";
import rzpLogo from "../../assets/Images/rzp_logo.png";
const loadScript = async (src) => {
  let script = document.createElement("script");
  script.src = src;
  return new Promise((resolve) => {
    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(true);
    };
    document.body.appendChild(script);
  });
};

export const buyCourse = async (
  token,
  courses,
  userDetails,
  navigate,
  dispatch,
  isBuyOne = false , 
) => {
  let secret_key = process.env.REACT_APP_RAZORPAY_KEY;
  console.log(secret_key);
  try {
    let loadsrc = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!loadsrc) {
      toast.error("RazorPay SDK failed to load");
      console.log("RazorPay SDK failed to load failure message");
      return;
    }

    let responce = await Apiconnection(
      "POST",
      PAYMENT_API.PAYMENT_CAPTURE,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!responce.data.success) {
      toast.error("Something went wrong!! 🥲🥲🥲");
      throw new Error("Error Occure While Buying Course");
    }
    console.log("order id : " , responce);
    const { amount, currency, id, notes, offer_id, receipt, status } =
      responce.data?.OrderDetails;
    const { firstName, lastName, email } = userDetails;
    const options = {
      key: "rzp_test_vDHKDM9pUWJvyq", 
      amount: amount,
      currency: "INR",
      name: "StudyNotion",
      description: "Thank You see you inside Course",
      image: rzpLogo,
      account_id: "acc_Ef7ArAsdU5t0XL",
      order_id: id,
      handler: function (response) {
      console.log(responce)
        // successfully
        sendSuccessfulPaymentEmail(
          {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
          },
          token
        );
        const { razorpay_payment_id , razorpay_order_id , razorpay_signature } = response;
        // razorpay_payment_id , razorpay_order_id , razorpay_signature , courses
        paymentVerificationHandler( {razorpay_payment_id , razorpay_order_id , razorpay_signature , courses} , token , isBuyOne);
      },
      prefill: {
        name: `${firstName + " " + lastName}`,
        email: email,
        contact: "9000090000",
      },
      theme: {
        color: "#3399cc",
      },
    };
    console.log(options);
    var rzp = new window.Razorpay(options);
    rzp.open();
    rzp.on("payment.failed", function (response) {
      toast.error("oops, payment failed");
      console.log(response.error);
      console.log(response)
    });
  } catch (e) {
    // console.log(e);
    console.log("error : ", e);
    toast.error(e.response?.data?.message);
  }
};

const sendSuccessfulPaymentEmail = async (orderData, token) => {
  try {
    const response = await Apiconnection(
      "post",
      PAYMENT_API.SUCCESSFUL_PAYMENT_MAIL,
      orderData,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response.data.success) {
      toast.error("Failed to send payment confirmation email");
      throw new Error("Failed to send payment confirmation email");
    }
    
  } catch (e) {
    console.log(e);
    toast.error("Failed to send payment confirmation email");
  }
};

const paymentVerificationHandler = async (verificationData, token , isOneBuy) => {
  let toastId = toast.loading("Verifying the payment ...");
  try {
    const response = await Apiconnection(
      "post",
      PAYMENT_API.VERIFY_PAYMENT,
      verificationData,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    toast.dismiss(toastId);
    if (!response.data.success) {
      throw new Error("Failed to verify payment");
    }
    toast.success("Verified payment successfully");
    if(isOneBuy){
      // navigate in the already having course
    }else{
      // remove all the cart and navigate in the already having course
    }
  } catch (e) {
    toast.dismiss(toastId);
    console.log(e);
    toast.error("Failed to verify payment");
  }
};
