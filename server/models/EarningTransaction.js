const mongoose = require("mongoose");

const earningTransactionSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  instructorShare: {
    type: Number,
    required: true
  },
  platformShare: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("EarningTransaction", earningTransactionSchema);
