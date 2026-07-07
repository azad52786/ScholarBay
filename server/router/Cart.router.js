const express = require("express");
const router = express.Router();
const { auth, isStudent } = require("../middlewares/auth.middleware");
const { getCart, addToCart, removeFromCart, resetCart } = require("../controllers/Cart.controller");

router.get("/get-cart", auth, isStudent, getCart);
router.post("/add-to-cart", auth, isStudent, addToCart);
router.post("/remove-from-cart", auth, isStudent, removeFromCart);
router.post("/reset-cart", auth, isStudent, resetCart);

module.exports = router;
