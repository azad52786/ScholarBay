const Course = require("../models/Course");
const User = require("../models/User");
const Tag = require("../models/tags");
const { cloudinaryImageUploader } = require("../utils/imageUploader");

// is instructor middleware +
exports.createCourse = async (req, res) => {
  try {
    const {
      course,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      instructions,
      benefitOfCourse
    } = req.body;
    const thumbnail = req.files.thumbnailImage;

    if (
      !course ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !category || 
      !thumbnail ||
      !instructions ||
      !benefitOfCourse
    ) {
      return res.status(404).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    const instructorId = req.user.id;
    const tagDetails = await Tag.findById(tag);
    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: `Tag Not Found`,
      });
    }

    const cloudinaryImage = await cloudinaryImageUploader(
      thumbnail,
      process.env.FOLDER_NAME
    );
    const Category_arr = category.split(" ");
    const newCourse = await Course.create({
      courseName: course,
      courseDescription,
      whatYouWillLearn,
      price,
      benefitOfCourse , 
      thumbnail: cloudinaryImage.secure_url,
      instructor: instructorId,
      instructions: instructions,
      tag: tagDetails._id,
      category: Category_arr,
    });

    // add the new course to the list of instructor courses

    const updatedUser = await User.findByIdAndUpdate(
      { _id: instructorId },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    // update tag with updated course
    const updatedTag = await Tag.findByIdAndUpdate(
      { _id: tagDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: `Course Created Successfully`,
      course: newCourse,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `Something Went Wrong while creating a new Course`,
      error: e.message,
    });
  }
};

exports.showAllCourse = async function (req, res) {
  try {
    const courses = await Course.find(
      {},
      {
        course: true,
        courseDescription: true,
        price: true,
        thumbnail: true,
        instructor: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `Something Went Wrong while fetching all courses`,
      error: e.message,
    });
  }
};

exports.getAllCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate("ratingAndReviews")
      .populate("tag")
      .exec();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course Not Found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: course,
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: `Something Went Wrong while fetching all courses`,
      error: e.message,
    });
  }
};
