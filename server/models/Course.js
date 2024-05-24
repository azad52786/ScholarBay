const mongoose = require("mongoose");

// Define the Courses schema
// {
// 	"courseName": "Learn Python",
// 	"cousrseDescription": "Python is a simple programming language learning python is good for you carrer" , 
// 	"instructor" : "ObjectId",
// 	"whatYouLearn": "learn python",
// 	"courseContent": "ObjectId",
// 	"price" : "3999" , 
// 	"tag" : "ObjectId"
// }
const coursesSchema = new mongoose.Schema({
	courseName: { type: String },
	courseDescription: { type: String },
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	whatYouWillLearn: {
		type: String,
	},
	courseContent: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Section",
		},
	],
	ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RatingAndReview",
		},
	],
	price: {
		type: Number,
	},
	thumbnail: {
		type: String,
	},
	tag: {
		type: mongoose.Schema.Types.ObjectId,
		ref : "Tag" , 
	},
	category: {
		type: [String]
	},
	studentsEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
			ref: "User",
		},
	],
	instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
});

// Export the Courses model
module.exports = mongoose.model("Course", coursesSchema);