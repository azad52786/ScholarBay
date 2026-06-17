const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const certificateSchema = new mongoose.Schema(
  {
    uniqueCertificateId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    instructorName: {
      type: String,
      required: true,
    },
    platformName: {
      type: String,
      default: "ScholarBay",
      required: true,
    },
    issuedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
