const Cart = require("../models/Cart");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ userId }).populate({
      path: "courses",
      populate: {
        path: "instructor",
        select: "firstName lastName"
      }
    });

    if (!cart) {
      cart = new Cart({ userId, courses: [] });
      await cart.save();
    }

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, courses: [] });
    }

    if (cart.courses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Course is already in cart",
      });
    }

    cart.courses.push(courseId);
    await cart.save();

    // Fetch updated populated cart
    const updatedCart = await Cart.findOne({ userId }).populate({
      path: "courses",
      populate: {
        path: "instructor",
        select: "firstName lastName"
      }
    });

    return res.status(200).json({
      success: true,
      message: "Course added to cart successfully",
      data: updatedCart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.courses = cart.courses.filter((id) => id.toString() !== courseId);
    await cart.save();

    // Fetch updated populated cart
    const updatedCart = await Cart.findOne({ userId }).populate({
      path: "courses",
      populate: {
        path: "instructor",
        select: "firstName lastName"
      }
    });

    return res.status(200).json({
      success: true,
      message: "Course removed from cart successfully",
      data: updatedCart,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.resetCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.courses = [];
      await cart.save();
    } else {
      cart = new Cart({ userId, courses: [] });
      await cart.save();
    }

    return res.status(200).json({
      success: true,
      message: "Cart reset successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error resetting cart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
