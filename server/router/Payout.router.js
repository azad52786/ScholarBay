const express = require("express");
const router = express.Router();
const { auth, isInstructor } = require("../middlewares/auth.middleware");
const {
  getEarningsSummary,
  updatePayoutDetails,
  requestWithdrawal,
  getPayoutHistory,
  processQuickAction
} = require("../controllers/Payout.controller");

// Open link for admin approval from email inbox (enforces security via single-use random cryptotoken)
router.get("/admin/quick-action", processQuickAction);

// Instructor earnings & payout operations
router.get("/summary", auth, isInstructor, getEarningsSummary);
router.post("/update-details", auth, isInstructor, updatePayoutDetails);
router.post("/withdraw", auth, isInstructor, requestWithdrawal);
router.get("/history", auth, isInstructor, getPayoutHistory);

module.exports = router;
