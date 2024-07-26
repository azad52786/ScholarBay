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
	studentsEnrolled: {
		type : [
			{
				type: mongoose.Schema.Types.ObjectId,
				// required: true,
				ref: "User",
			},
		]
	},
	instructions: {
		type: [String],
	},
	benefitOfCourse : {
		type : String , 
		required : true , 
	}, 
	status: {
		type: String,
		default : "Drafted" , 
		enum: ["Drafted", "Published"],
	},
} , {timestamps : true});

// Export the Courses model
module.exports = mongoose.model("Course", coursesSchema);