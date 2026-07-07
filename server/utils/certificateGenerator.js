const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

/**
 * Generate a professional certificate PDF in Portrait Mode
 * @param {Object} certificateData - Certificate information
 * @param {string} certificateData.studentName - Name of the student
 * @param {string} certificateData.courseName - Name of the course
 * @param {string} certificateData.instructorName - Name of the instructor
 * @param {string} certificateData.certificateId - Unique certificate ID
 * @param {string} certificateData.platformName - Name of the platform
 * @param {Date} certificateData.generatedAt - Date certificate was generated
 * @param {string} logoPath - Path to company logo (optional)
 * @returns {Promise<Buffer>} - PDF buffer
 */
exports.generateCertificatePDF = async (certificateData, logoPath = null) => {
  return new Promise((resolve, reject) => {
    try {
      // Create A4 portrait document (595.28 x 841.89 points)
      const doc = new PDFDocument({
        size: "A4",
        margin: 40,
        bufferPages: true,
      });

      let buffers = [];

      doc.on("data", (data) => {
        buffers.push(data);
      });

      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      doc.on("error", (err) => {
        reject(err);
      });

      // 1. Decorative Borders (Perfectly Centered)
      // Outer border (Deep Charcoal Slate)
      doc
        .rect(30, 30, 535, 782)
        .strokeColor("#0f172a")
        .lineWidth(2)
        .stroke();

      // Inner border (Elegant Gold Accent)
      doc
        .rect(38, 38, 519, 766)
        .strokeColor("#d97706")
        .lineWidth(1)
        .stroke();

      // 2. Company Logo (Centered at the top)
      const logoWidth = 140;
      const logoX = (595.28 - logoWidth) / 2; // ~227.64
      if (logoPath && fs.existsSync(logoPath)) {
        try {
          doc.image(logoPath, logoX, 70, { width: logoWidth });
        } catch (err) {
          console.error("Logo rendering failed:", err.message);
        }
      }

      // 3. Title (y = 190)
      doc
        .fontSize(30)
        .font("Helvetica-Bold")
        .fillColor("#0f172a")
        .text("CERTIFICATE OF COMPLETION", 40, 190, {
          align: "center",
          width: 515,
        });

      // Decorative Separator Line (y = 235)
      doc
        .moveTo(160, 235)
        .lineTo(435, 235)
        .strokeColor("#d97706")
        .lineWidth(1.5)
        .stroke();

      // 4. Achievement text lead-in (y = 265)
      doc
        .fontSize(14)
        .font("Helvetica-Oblique")
        .fillColor("#475569")
        .text("This certificate is proudly presented to", 40, 265, {
          align: "center",
          width: 515,
        });

      // 5. Student Name - Large & Bold (y = 310)
      doc
        .fontSize(28)
        .font("Helvetica-Bold")
        .fillColor("#1e40af") // Classic Royal Blue
        .text(certificateData.studentName, 40, 310, {
          align: "center",
          width: 515,
        });

      // Subtly underline the student's name (y = 350)
      doc
        .moveTo(180, 350)
        .lineTo(415, 350)
        .strokeColor("#cbd5e1")
        .lineWidth(1)
        .stroke();

      // 6. Completion Text (y = 375)
      doc
        .fontSize(14)
        .font("Helvetica")
        .fillColor("#475569")
        .text("for successfully completing the course", 40, 375, {
          align: "center",
          width: 515,
        });

      // 7. Course Name (y = 415)
      doc
        .fontSize(22)
        .font("Helvetica-Bold")
        .fillColor("#0f172a")
        .text(certificateData.courseName, 40, 415, {
          align: "center",
          width: 515,
        });

      // 8. Instructor Name (y = 465)
      doc
        .fontSize(14)
        .font("Helvetica")
        .fillColor("#475569")
        .text(`under the guidance of ${certificateData.instructorName}`, 40, 465, {
          align: "center",
          width: 515,
        });

      // 9. Detailed Achievement Message (y = 515)
      doc
        .fontSize(11)
        .font("Helvetica")
        .fillColor("#64748b")
        .text(
          "Your dedication, commitment, and hard work are greatly appreciated. We wish you continued success in your learning journey.",
          75,
          515,
          {
            align: "center",
            width: 445,
            lineGap: 4,
          }
        );

      // 10. Dual Signature & Date Columns (y = 615)
      const completionDate = new Date(certificateData.generatedAt);
      const formattedDate = completionDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Left Column: Date of Completion
      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor("#334155")
        .text(formattedDate, 80, 615, { align: "center", width: 180 });

      // Left Column Line
      doc
        .moveTo(80, 635)
        .lineTo(260, 635)
        .strokeColor("#94a3b8")
        .lineWidth(1)
        .stroke();

      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor("#64748b")
        .text("Date of Completion", 80, 642, { align: "center", width: 180 });

      // Right Column: Instructor Name
      doc
        .fontSize(11)
        .font("Helvetica-Oblique")
        .fillColor("#334155")
        .text(certificateData.instructorName, 335, 615, { align: "center", width: 180 });

      // Right Column Line
      doc
        .moveTo(335, 635)
        .lineTo(515, 635)
        .strokeColor("#94a3b8")
        .lineWidth(1)
        .stroke();

      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor("#64748b")
        .text("Authorized Instructor", 335, 642, { align: "center", width: 180 });

      // 11. Footer Branding & Unique Certificate ID (y = 710)
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#0f172a")
        .text(certificateData.platformName, 40, 710, {
          align: "center",
          width: 515,
        });

      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor("#64748b")
        .text("Your Gateway to Excellence", 40, 725, {
          align: "center",
          width: 515,
        });

      doc
        .fontSize(8)
        .font("Helvetica")
        .fillColor("#94a3b8")
        .text(`Certificate ID: ${certificateData.certificateId}`, 40, 745, {
          align: "center",
          width: 515,
        });

      // Finalize PDF document
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Generate and save certificate PDF to a file
 * @param {Object} certificateData - Certificate information
 * @param {string} outputPath - Where to save the PDF
 * @param {string} logoPath - Path to company logo (optional)
 * @returns {Promise<string>} - Path to generated PDF
 */
exports.generateAndSaveCertificatePDF = async (
  certificateData,
  outputPath,
  logoPath = null
) => {
  const pdfBuffer = await exports.generateCertificatePDF(certificateData, logoPath);
  
  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write to file
  fs.writeFileSync(outputPath, pdfBuffer);
  return outputPath;
};
