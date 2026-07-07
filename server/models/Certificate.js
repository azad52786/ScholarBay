const mongoose = require("mongoose");
const crypto = require("crypto");

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      default: () => crypto.randomUUID(),
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
    generatedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    pdfUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Create indexes for quick lookups
certificateSchema.index({ studentId: 1, courseId: 1 }, { unique: true });
certificateSchema.index({ certificateId: 1 });

module.exports = mongoose.model("Certificate", certificateSchema);
