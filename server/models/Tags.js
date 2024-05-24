const mongoose = require('mongoose');
const {Schema} = require('mongoose');

// {
//     "name": "Python" , 
//     "description" : "this is a python course "
// }
const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
    } , 
    description: { type: String },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }
    ]
} , {timestamps: true});
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
