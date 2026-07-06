const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const createCertificatePDF = async ({ studentName, courseName, instructorName, completionDate, certificateId, companyName, logoPath }) => {
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    const fileName = `certificate-${certificateId}.pdf`;
    const filePath = path.join(__dirname, "..", "uploads", fileName);

    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.image(logoPath, 220, 40, { width: 160, fit: [160, 160] });
    doc.fontSize(24).text(companyName, 0, 220, { align: "center" });
    doc.fontSize(16).text("Certificate of Completion", 0, 260, { align: "center" });
    doc.moveDown(2);
    doc.fontSize(12).text("This certificate is proudly presented to", 0, 320, { align: "center" });
    doc.fontSize(24).font("Helvetica-Bold").text(studentName, 0, 350, { align: "center" });
    doc.fontSize(12).font("Helvetica").text(`for successfully completing the course ${courseName}`, 0, 390, { align: "center" });
    doc.text(`under the guidance of ${instructorName}`, 0, 415, { align: "center" });
    doc.moveDown(2);
    doc.text("Your dedication, commitment, and hard work are greatly appreciated. We wish you continued success in your learning journey.", 70, 470, { align: "center", width: 460 });
    doc.fontSize(10).text(`Certificate ID: ${certificateId}`, 70, 610);
    doc.text(`Completed On: ${completionDate}`, 70, 630);
    doc.text(`Issued By: ${companyName}`, 70, 650);
    doc.end();

    await new Promise((resolve, reject) => {
        stream.on("finish", resolve);
        stream.on("error", reject);
    });

    return { filePath, fileName };
};

module.exports = { createCertificatePDF };
