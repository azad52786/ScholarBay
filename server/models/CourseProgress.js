const mongoose = require("mongoose");

const courseProgress = new mongoose.Schema({
	userId : {
		type : mongoose.Schema.Types.ObjectId , 
		ref : "User"
	} , 
	courseId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
	},
	completedVideos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "SubSection",
		},
	],
});

module.exports = mongoose.model("CourseProgress", courseProgress);