import { toast } from "react-hot-toast";
import Apiconnection from "../Apiconnection";
import { PAYMENT_API } from "../Api";
import rzpLogo from "../../assets/Images/rzp_logo.png";
import { load } from "@cashfreepayments/cashfree-js";
import { deleteItem, resetCart } from "../../Store/Slices/CartSlice";
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
  try {
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
    
   let cashfree;
    var initializeSDK = async function () {          
        cashfree = await load({
            mode: "sandbox"
        });
    }
    await initializeSDK();
    const { payment_session_id , order_id }= responce.data?.OrderDetails;
    let checkoutOptions = {
            paymentSessionId: payment_session_id,
            redirectTarget: "_modal",
      };
      
      
      
      cashfree.checkout(checkoutOptions).then(async(result) => {
            if(result.error){
                // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
                console.log("User has closed the popup or there is some payment error, Check for Payment Status");
                console.log(result.error);
            }
            if(result.redirect){
                // This will be true when the payment redirection page couldnt be opened in the same window
                // This is an exceptional case only when the page is opened inside an inAppBrowser
                // In this case the customer will be redirected to return url once payment is completed
                console.log("Payment will be redirected");
            }
            if(result.paymentDetails){
                // This will be called whenever the payment is completed irrespective of transaction status
                console.log("Payment has been completed, Check for Payment Status");
                let data = await paymentVerificationHandler( { order_id , courses} , token , isBuyOne , navigate , dispatch);
                
            }
        });
   
  } catch (e) {
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

const paymentVerificationHandler = async (verificationData, token , isOneBuy , navigate , dispatch) => {
  let toastId = toast.loading("Verifying the payment ...");
  let { courses } = verificationData;
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
      // if present into cart remove from cart 
      let courseId = courses[0]
      dispatch(deleteItem(courseId));
      // navigate in the already having course
      navigate("/dashboard/default/enrolled-courses");
    }else{
      // remove all the cart and navigate in the already having course
      dispatch(resetCart());
      console.log("cart Cleared successfully done");
      navigate("/dashboard/default/enrolled-courses")
    }
  } catch (e) {
    toast.dismiss(toastId);
    console.log(e);
    toast.error("Failed to verify payment");
  }
};
