import Apiconnection from "../Apiconnection";
import { CART_API } from "../Api";
import { setCart, resetCart } from "../../Store/Slices/CartSlice";
import { toast } from "react-hot-toast";

export const fetchCart = async (token, dispatch) => {
  try {
    const response = await Apiconnection(
      "GET",
      CART_API.GET_CART,
      null,
      { Authorization: `Bearer ${token}` }
    );
    if (response?.data?.success) {
      dispatch(setCart(response.data.data.courses));
    }
  } catch (error) {
    console.error("Error fetching cart from DB:", error);
  }
};

export const addToCartDB = async (course, token, dispatch) => {
  let toastId = toast.loading("Adding course to cart...");
  try {
    const response = await Apiconnection(
      "POST",
      CART_API.ADD_TO_CART,
      { courseId: course._id },
      { Authorization: `Bearer ${token}` }
    );
    if (response?.data?.success) {
      dispatch(setCart(response.data.data.courses));
      toast.success("Course added to cart");
    } else {
      toast.error(response?.data?.message || "Failed to add to cart");
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error(error?.response?.data?.message || "Already in cart or failed to add");
  } finally {
    toast.dismiss(toastId);
  }
};

export const removeFromCartDB = async (courseId, token, dispatch) => {
  let toastId = toast.loading("Removing course from cart...");
  try {
    const response = await Apiconnection(
      "POST",
      CART_API.REMOVE_FROM_CART,
      { courseId },
      { Authorization: `Bearer ${token}` }
    );
    if (response?.data?.success) {
      dispatch(setCart(response.data.data.courses));
      toast.success("Course removed from cart");
    } else {
      toast.error(response?.data?.message || "Failed to remove from cart");
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    toast.error(error?.response?.data?.message || "Failed to remove from cart");
  } finally {
    toast.dismiss(toastId);
  }
};

export const resetCartDB = async (token, dispatch) => {
  let toastId = toast.loading("Clearing cart...");
  try {
    const response = await Apiconnection(
      "POST",
      CART_API.RESET_CART,
      null,
      { Authorization: `Bearer ${token}` }
    );
    if (response?.data?.success) {
      dispatch(resetCart());
      toast.success("Cart cleared");
    } else {
      toast.error(response?.data?.message || "Failed to clear cart");
    }
  } catch (error) {
    console.error("Error resetting cart:", error);
    toast.error("Failed to clear cart");
  } finally {
    toast.dismiss(toastId);
  }
};
