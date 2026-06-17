const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema(
	{
		questionText: { type: String, required: true },
		options: {
			type: [String],
			default: [],
		},
		correctOptionIndex: {
			type: Number,
			required: true,
		},
	},
	{ _id: false }
);


// {
// 	"title": "Data Types in python" , 
// 	"timeDuration": "10 minutes" , 
// 	"description": "Learn python basic"
// }
const SubSectionSchema = new mongoose.Schema({
	title: { type: String },
	description: { type: String },
	hours: { type: String },
	minutes: { type: String },
	contentType: {
		type: String,
		enum: ["VIDEO", "TEXT_NOTE", "QUIZ_ASSESSMENT"],
		default: "VIDEO",
	},
	videoUrl: { type: String },
	markdownContent: {
		type: String,
	},
	quizData: {
		type: [quizQuestionSchema],
		default: [],
	},
	videoMeta: {
		provider: { type: String },
		publicId: { type: String },
		secureUrl: { type: String },
	},
	watched: {
		type: Boolean,
		default: false,
	}
});

module.exports = mongoose.model("SubSection", SubSectionSchema);
