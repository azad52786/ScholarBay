const mongoose = require("mongoose");

const lessonCompletionSchema = new mongoose.Schema(
  {
    subSectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
      required: true,
    },
    completed: {
      type: Boolean,
      default: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const courseProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLessons: [lessonCompletionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseProgress", courseProgressSchema);