const mongoose = require("mongoose");
const Tag = require("../models/tags");

exports.createTag = async(req , res) => {
    try{
        const {name , description} = req.body;
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "Name and Description are required"
            })
        }
        const tag = await Tag.find({name: name});
        console.log(tag)
        if(tag.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Tag already exists"
            })
        }

        const newTag = new Tag({
            name,
            description
        })
        await newTag.save();
        return res.status(200).json({
            success: true,
            message: "Tag created successfully"
        })
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating tag"
        })
    }
}


exports.showAllTags = async function(req , res) {
    try{
        const tags = await Tag.find({} , {name : true , description : true}); 
        return res.status(200).json({
            success: true,
            message: "Tags fetched successfully",
            tags
        })
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching tags"
        })
    }
}

exports.tagsPageDetails =async function (req, res){
    try {
        const { tagId } = req.body;
        const currentTagCourses = await Tag.findById(tagId).populate({
            path : "courses" , 
            match : { status : "Public" } , 
            populate : [
                {
                    path : "instructor" , 
                },
                {
                    path : 'ratingAndReviews' , 
                }
            ]
        }).exec();
        console.log("consodjfsodifidsf: " , currentTagCourses.courses.length)
        if(!currentTagCourses){
            return res.status(404).json({
                success: false,
                message: "course not found"
            })
        }
        const differentTagsCourses = await Tag.find({_id : {$ne : tagId}}).populate({
            path : "courses" , 
            match : { status : 'Public'} , 
            populate : [
                {
                    path : "instructor" , 
                },
                {
                    path : 'ratingAndReviews' , 
                }
            ]
        }).exec();
        //Todo :  get top selling courses
        const allCatagorys = await Tag.find().populate({
            path : "courses" , 
            match : { status : "Public" } , 
            populate : {
                path : "instructor"
            }
        }).exec();
        const allcourses = allCatagorys.flatMap((catagory) => catagory.courses);
        const mostSellingCourses = allcourses
        .sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
        .slice(0, 6);
        // console.log("Top Selling Courses " , mostSellingCourses)
        // console.log(allCatagorys)
        return res.status(201).json({
            success: true,
            message: "Tags fetched successfully",
            currentTagCourses,
            differentTagsCourses , 
            mostSellingCourses 
        })
    }catch(e){
        return res.status(500).json({
            success: false, 
            message: "Something went wrong while fetching tags",
            error: e.message,
        })
    }
}

