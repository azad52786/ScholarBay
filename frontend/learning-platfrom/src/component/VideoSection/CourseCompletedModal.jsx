import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { FaDownload } from 'react-icons/fa';
import Apiconnection from '../../service/Apiconnection';
import { CERTIFICATE_API } from '../../service/Api';

const CourseCompletedModal = ({ certificate, onClose, token }) => {
  const certRef = useRef();

  const downloadPdf = () => {
    const element = certRef.current;
    const opt = {
      margin: 0.5,
      filename: `${certificate.courseName}_certificate.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save();
  }

  const emailCert = async () => {
    try {
      await Apiconnection(
        'POST',
        CERTIFICATE_API.SEND_EMAIL,
        { courseId: certificate.courseId },
        { Authorization: `Bearer ${token}` }
      );
      alert('Certificate emailed successfully');
    } catch (e) {
      alert('Failed to send email');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-richblack-900 rounded-2xl w-[90%] max-w-4xl p-6 text-richblack-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Course Completed</h3>
          <button onClick={onClose} className="text-richblack-300">Close</button>
        </div>

        <div ref={certRef} className="bg-white text-black rounded-lg p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Certificate of Completion</h2>
              <p className="mt-2">This certifies that</p>
              <h3 className="text-2xl font-semibold mt-2">{certificate.studentName}</h3>
              <p className="mt-2">has successfully completed the course</p>
              <h4 className="text-xl font-semibold mt-2">{certificate.courseName}</h4>
              <p className="mt-4">Instructor: {certificate.instructorName}</p>
            </div>
            <div className="text-right">
              <div className="bg-richblack-800 text-white px-4 py-2 rounded">ScholarBay</div>
              <div className="mt-6 text-sm">ID: {certificate.uniqueCertificateId}</div>
              <div className="mt-4 w-28 h-28 bg-gray-200 flex items-center justify-center">QR</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button onClick={downloadPdf} className="bg-yellow-100 text-richblack-900 px-4 py-2 rounded flex items-center gap-2"><FaDownload /> Download PDF Certificate</button>
          <button onClick={emailCert} className="border border-richblack-600 px-4 py-2 rounded">Email Certificate to Me</button>
        </div>
      </div>
    </div>
  );
}

export default CourseCompletedModal;
