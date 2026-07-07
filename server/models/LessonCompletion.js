const mongoose = require("mongoose");

const lessonCompletionSchema = new mongoose.Schema(
  {
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
    subSectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Create a compound index for fast lookups
lessonCompletionSchema.index({ studentId: 1, courseId: 1 });
lessonCompletionSchema.index({ studentId: 1, subSectionId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("LessonCompletion", lessonCompletionSchema);
