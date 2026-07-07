const mongoose = require("mongoose");

const payoutRequestSchema = new mongoose.Schema({
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  },
  paymentDetailsUsed: {
    type: Object,
    required: true
  },
  transactionId: {
    type: String,
    default: ""
  },
  adminRemarks: {
    type: String,
    default: ""
  },
  approvalToken: {
    type: String,
    unique: true,
    sparse: true
  },
  tokenExpires: {
    type: Date
  },
  requestedAt: {
    type: Date,
    default: Date.now
  },
  processedAt: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model("PayoutRequest", payoutRequestSchema);
