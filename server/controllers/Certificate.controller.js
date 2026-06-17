const Certificate = require('../models/Certificate');
const User = require('../models/User');
const mailSender = require('../utils/mailSend');

exports.emailCertificate = async (req, res) => {
  try {
    const certId = req.params.id;
    const cert = await Certificate.findById(certId).populate('studentId courseId');
    if (!cert) return res.status(404).json({ success: false, message: 'Certificate not found' });

    const student = await User.findById(cert.studentId);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    const emailBody = `<!DOCTYPE html>
      <html>
      <head>
      <meta charset="utf-8" />
      <title>Certificate from ScholarBay</title>
      </head>
      <body>
      <div style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;color:#111">
      <a href=\"https://scholar-bay.vercel.app\"><img src=\"https://i.ibb.co/cyCSrPQ/Screenshot-2024-11-11-094719.png\" alt=\"ScholarBay\" style=\"max-width:180px;margin-bottom:16px\"/></a>
      <h2>Congratulations ${cert.studentName}!</h2>
      <p>You have successfully completed the course <strong>${cert.courseName}</strong> instructed by ${cert.instructorName}.</p>
      <p>Your certificate ID: <strong>${cert.uniqueCertificateId}</strong></p>
      <p>Issued on: ${new Date(cert.issuedAt).toLocaleString()}</p>
      <p>You can download your certificate from your ScholarBay dashboard.</p>
      <p>Warm regards,<br/>ScholarBay Team</p>
      </div>
      </body>
      </html>`;

    await mailSender(student.email, `Your ScholarBay Certificate - ${cert.courseName}`, emailBody);

    return res.status(200).json({ success: true, message: 'Email sent' });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Create or return existing certificate for a student/course
exports.createOrGetCertificate = async (req, res) => {
  try {
    const { courseId } = req.query;
    const userId = req.user.id;
    if (!courseId) return res.status(400).json({ success: false, message: 'courseId required' });

    let existing = await Certificate.findOne({ studentId: userId, courseId });
    if (existing) return res.status(200).json({ success: true, certificate: existing });

    const course = await require('../models/Course').findById(courseId).populate('instructor');
    const student = await User.findById(userId);
    if (!course || !student) return res.status(404).json({ success: false, message: 'Student or Course not found' });

    const certificate = await Certificate.create({
      studentId: userId,
      courseId,
      studentName: `${student.firstName} ${student.lastName}`,
      courseName: course.courseName,
      instructorName: `${course.instructor.firstName} ${course.instructor.lastName}`,
      platformName: 'ScholarBay'
    });

    return res.status(201).json({ success: true, certificate });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
