const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const { courseEnrollmentEmail } = require("../mails/courseEnrollmentEmail");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSend");
const { createHmac } = require("node:crypto");
const { paymentSuccessEmail } = require("../mails/paymentSuccessEmail");
const Cashfree = require("../config/cashFree.js");
const { response } = require("express");

exports.verifySignature = async (req, res) => {
  try {
    let { order_id, courses } = req.body;
    const userId = req.user.id;

    if (!courses || !userId) {
      return res.status(401).json({
        success: false,
        message: "Payment Verification All fields required",
      });
    }

    if (!order_id) {
      return res.status(401).json({
        success: false,
        message: "Payment Order Id is required",
      });
    }

    Cashfree.PGOrderFetchPayments("2023-08-01", order_id)
      .then(async (response) => {
        let orderResponse = response.data;
       
        let successfulOrder = orderResponse.filter(
          (payment) => payment.payment_status === "SUCCESS"
        );
        if (successfulOrder.length > 0) {
          // payment successful lets give him/her course
          await enrollStudents(res, courses, userId);
          // save the payment information in DB . But For now i'm just ignoring it
          let { payment_amount, order_id, cf_payment_id } = successfulOrder[0];
          await sendPaymentSuccessEmail(
            order_id,
            cf_payment_id,
            payment_amount,
            userId
          );

          return res.status(200).json({
            success: true,
            message: "Course Enrollment done.",
          });
        } else if (
          orderResponse.filter(
            (payment) => payment.payment_status === "PENDING"
          ).length > 0
        ) {
          // payment pending
          console.log("payment pending");
        } else {
          // payment failed
          console.log("payment failed");
        }
      })
      .catch((error) => {
        console.error("Full error:", error);

        const errorMessage =
          error.response?.data?.message || "Unknown error occurred";

        console.error("Error:", errorMessage);

        return res.status(500).json({
          success: false,
          message: "Failed to fetch payment status from Cashfree.",
          error: errorMessage,
        });
      });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.message,
      message: "Verification internal error!!!",
    });
  }
};

const enrollStudents = async (res, courses, userId) => {
  try {
    if (!courses || courses.length <= 0 || !userId) {
      return res.status(401).json({
        success: false,
        message:
          "Please Courses Data of Enroll Course or Provide Data for userId",
      });
    }

    for (let courseId of courses) {
      try {
        let enrollCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $push: { studentsEnrolled: userId } },
          { new: true }
        );

        if (!enrollCourse) {
          return res.status(401).json({
            success: false,
            message: "CourseEnrollment Failed!!!!",
          });
        }

        let enrollStudent = await User.findOneAndUpdate(
          { _id: userId },
          { $push: { courses: courseId } },
          { new: true }
        );
        if (!enrollStudent) {
          return res.status(401).json({
            success: false,
            message: "Student Enrollment Failed!!!!",
          });
        }

        const emailResponce = await mailSender(
          enrollStudent.email,
          `Successfully enrolled ${enrollCourse.courseName}`,
          courseEnrollmentEmail(
            enrollCourse.courseName,
            enrollStudent.firstName
          )
        );
      } catch (e) {
        return res.status(401).json({
          success: false,
          error: e,
          message: "Enrolled Course Failed!!!!",
        });
      }
    }
  } catch (e) {
    return res.status(401).json({
      success: false,
      error: e,
      message: "Enrolled Course Failed!!!!",
    });
  }
};

const generateUniqueId = () => {
  let date = Date.now();
  let random = Math.floor(Math.random() * 100000);
  return `${date}${random}`;
};

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courses } = req.body;

    if (!courses || courses.length === 0) {
      return res.status(501).json({
        success: false,
        message: "No Courses is Selected!!!",
      });
    }

    let user = await User.findById(userId, { email: 1 });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }
    let totalPrice = 0;
    let uuid = new mongoose.Types.ObjectId(userId);
    for (let course of courses) {
      try {
        let courseDetails = await Course.findById(course);
        if (!courseDetails) {
          return res.status(404).send({
            success: false,
            message: "Course Not Found",
          });
        }

        if (courseDetails.studentsEnrolled.includes(uuid)) {
          return res.status(444).json({
            success: false,
            message: "User already Enrolled!!!",
          });
        }
        totalPrice += courseDetails.price;
      } catch (e) {
        return res.status("501").json({
          success: false,
          error: e.message,
          message: "Error Occure while validateing the course",
        });
      }
    }

    var request = {
      order_amount: totalPrice,
      order_currency: "INR",
      order_id: generateUniqueId(),
      customer_details: {
        customer_id: userId,
        customer_phone: "8474090589",
        customer_email: user.email,
      },
      order_meta: {
        return_url:
          "",
      },
    };

    try {
      let responce = await Cashfree.PGCreateOrder("2023-08-01", request);
      console.log("Order Created Successfully ", responce.data);
      return res.status(200).json({
        success: true,
        OrderDetails: responce.data,
      });
    } catch (error) {
      console.error("Error:", error.response.data.message);
    }
  } catch (e) {
    return res.status(501).json({
      success: false,
      error: e.message,
      message: "internal error!!!",
    });
  }
};

const sendPaymentSuccessEmail = async (orderId, paymentId, amount, userId) => {
  try {
    const userDetails = await User.findById(userId);
    await mailSender(
      userDetails.email,
      "Payment Successful Mailing",
      paymentSuccessEmail(
        `${userDetails.firstName + " " + userDetails.lastName}`,
        amount,
        orderId,
        paymentId
      )
    );
  } catch (e) {
    console.error(e);
  }
};
