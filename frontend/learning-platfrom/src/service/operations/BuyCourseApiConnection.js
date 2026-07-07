import { toast } from "react-hot-toast";
import Apiconnection from "../Apiconnection";
import { PAYMENT_API } from "../Api";
import { load } from "@cashfreepayments/cashfree-js";
import { removeFromCartDB, resetCartDB } from "./CartBackendConnection";

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
                console.log("User has closed the popup or there is some payment error, Check for Payment Status");
                console.log(result.error);
            }
            if(result.redirect){
                console.log("Payment will be redirected");
            }
            if(result.paymentDetails){
                console.log("Payment has been completed, Check for Payment Status");
                await paymentVerificationHandler( { order_id , courses} , token , isBuyOne , navigate , dispatch);
            }
        });
   
  } catch (e) {
    console.log("error : ", e);
    toast.error(e.response?.data?.message);
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
      removeFromCartDB(courseId, token, dispatch);
      // navigate in the already having course
      navigate("/dashboard/default/enrolled-courses");
    }else{
      // remove all the cart and navigate in the already having course
      resetCartDB(token, dispatch);
      console.log("cart Cleared successfully done");
      navigate("/dashboard/default/enrolled-courses")
    }
  } catch (e) {
    toast.dismiss(toastId);
    console.log(e);
    toast.error("Failed to verify payment");
  }
};
