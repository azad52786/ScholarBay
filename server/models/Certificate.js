const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
    {
        certificateId: {
            type: String,
            required: true,
            unique: true,
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
        generatedAt: {
            type: Date,
            default: Date.now,
        },
        fileName: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
