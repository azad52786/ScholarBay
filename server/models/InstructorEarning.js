const mongoose = require("mongoose");

const instructorEarningSchema = new mongoose.Schema({
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  currentBalance: {
    type: Number,
    default: 0
  },
  withdrawnAmount: {
    type: Number,
    default: 0
  },
  payoutDetails: {
    bankAccount: { type: String, default: "" },
    ifscCode: { type: String, default: "" },
    accountHolderName: { type: String, default: "" },
    upiId: { type: String, default: "" }
  }
}, { timestamps: true });

module.exports = mongoose.model("InstructorEarning", instructorEarningSchema);
