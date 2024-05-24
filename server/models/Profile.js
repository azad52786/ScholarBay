const mongoose = require("mongoose");

// Define the Profile schema
// {
// 	"gender" : "male", 
// 	"about" : "I am a btech student", 
// 	"dateOfBirth" : "12/02/2015",
// 	"contactNumber" : "123"
// }
const profileSchema = new mongoose.Schema({
	gender: {
		type: String, 
	},
	dateOfBirth: {
		type: String,
	},
	about: {
		type: String,
		trim: true,
	},
	contactNumber: {
		type: Number,
		trim: true,
	},
});

// Export the Profile model
module.exports = mongoose.model("Profile", profileSchema);