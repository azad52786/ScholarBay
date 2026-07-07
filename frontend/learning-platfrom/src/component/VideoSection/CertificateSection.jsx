import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FaDownload, FaEnvelope, FaCertificate, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import Apiconnection from '../../service/Apiconnection';
import { CERTIFICATE_API } from '../../service/Api';
import toast from 'react-hot-toast';

const CertificateSection = ({ courseId }) => {
  const [eligibility, setEligibility] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [emailing, setEmailing] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useSelector((store) => store.Auth);

  const checkEligibility = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch eligibility and existing certificate in parallel
      const [eligRes, certRes] = await Promise.all([
        Apiconnection(
          'GET',
          `${CERTIFICATE_API.CHECK_ELIGIBILITY}?courseId=${courseId}`,
          null,
          { Authorization: `Bearer ${token}` }
        ),
        Apiconnection(
          'GET',
          `${CERTIFICATE_API.GET_CERTIFICATE}?courseId=${courseId}`,
          null,
          { Authorization: `Bearer ${token}` }
        )
      ]);

      if (eligRes.data?.success) {
        setEligibility(eligRes.data);
      }
      if (certRes.data?.success) {
        setCertificate(certRes.data.certificate);
      }
    } catch (err) {
      console.error('Error checking eligibility:', err);
      setError(err.response?.data?.message || 'Failed to check certificate eligibility');
    } finally {
      setLoading(false);
    }
  }, [courseId, token]);

  useEffect(() => {
    if (courseId && token) {
      checkEligibility();
    }
  }, [courseId, token, checkEligibility]);

  const handleDownload = async () => {
    let toastId;
    try {
      setDownloading(true);
      toastId = toast.loading("Generating your PDF certificate...");

      // Direct axios call with blob responseType to ensure PDF downloads correctly
      const response = await axios.get(
        `${CERTIFICATE_API.DOWNLOAD}?courseId=${courseId}`,
        {
          headers: { 'Authorization': `Bearer ${token}` },
          responseType: 'blob'
        }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Certificate_${courseId}_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.dismiss(toastId);
      toast.success('Certificate downloaded successfully!');

      // Automatically email the certificate to the student
      try {
        await Apiconnection(
          'POST',
          CERTIFICATE_API.SEND_EMAIL,
          { courseId },
          { Authorization: `Bearer ${token}` }
        );
        toast.success('Certificate also sent to your registered email address!');
      } catch (emailErr) {
        console.error('Failed to automatically email certificate:', emailErr);
      }
    } catch (err) {
      console.error('Error downloading certificate:', err);
      if (toastId) toast.dismiss(toastId);
      toast.error('Failed to download certificate');
    } finally {
      setDownloading(false);
    }
  };

  const handleEmail = async () => {
    try {
      setEmailing(true);
      const toastId = toast.loading("E-mailing certificate...");

      const response = await Apiconnection(
        'POST',
        CERTIFICATE_API.SEND_EMAIL,
        { courseId },
        { Authorization: `Bearer ${token}` }
      );

      toast.dismiss(toastId);
      if (response.data?.success) {
        toast.success('Certificate emailed successfully! Please check your inbox.');
      } else {
        toast.error(response.data?.message || 'Failed to email certificate');
      }
    } catch (err) {
      console.error('Error emailing certificate:', err);
      toast.error(err.response?.data?.message || 'Failed to email certificate');
    } finally {
      setEmailing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-richblack-200">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
      </div>
    );
  }

  const { eligible, reasons } = eligibility || {};
  const canDownload = eligible === true;

  return (
    <div className="mx-auto w-[97%] py-8">
      <div className="rounded-3xl border border-richblack-700 bg-richblack-800/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-8">
        
        {/* Header */}
        <div className="mb-8 flex items-center gap-4 border-b border-richblack-700 pb-4">
          <div className="p-3 bg-yellow-25/10 text-yellow-50 rounded-2xl">
            <FaCertificate className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-richblack-5">Course Certificate</h2>
            <p className="text-sm text-richblack-300">Verify your achievements and download your completion certificate.</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 text-red-200 rounded-xl flex items-center gap-3">
            <FaExclamationTriangle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Eligibility Panel */}
          <div className="space-y-6">
            <div className="p-6 bg-richblack-900/60 border border-richblack-700 rounded-2xl">
              <h3 className="text-lg font-semibold text-richblack-25 mb-4">Requirements for Certification:</h3>
              <div className="space-y-4">
                
                {/* Condition 1: Progress */}
                <div className="flex items-start gap-4">
                  <div className={`p-1.5 rounded-full flex-shrink-0 ${
                    reasons?.progressComplete 
                      ? 'bg-caribbeangreen-300/20 text-[#14e822]' 
                      : 'bg-richblack-800 text-richblack-400'
                  }`}>
                    <FaCheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-richblack-5">Complete all course lessons</h4>
                    <p className="text-sm text-richblack-300">Current progress must be 100%.</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded ${
                      reasons?.progressComplete ? 'bg-[#14e822]/10 text-[#14e822]' : 'bg-yellow-25/10 text-yellow-50'
                    }`}>
                      {reasons?.progressComplete ? 'Complete' : 'Incomplete'}
                    </span>
                  </div>
                </div>

                {/* Condition 2: Published */}
                <div className="flex items-start gap-4">
                  <div className={`p-1.5 rounded-full flex-shrink-0 ${
                    reasons?.certificatePublished 
                      ? 'bg-caribbeangreen-300/20 text-[#14e822]' 
                      : 'bg-richblack-800 text-richblack-400'
                  }`}>
                    <FaCheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-richblack-5">Certificate Published by Instructor</h4>
                    <p className="text-sm text-richblack-300">The instructor must authorize certificate issuance.</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded ${
                      reasons?.certificatePublished ? 'bg-[#14e822]/10 text-[#14e822]' : 'bg-pink-300/10 text-pink-200'
                    }`}>
                      {reasons?.certificatePublished ? 'Published' : 'Pending Instructor Release'}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Status Warning if not eligible */}
            {!canDownload && (
              <div className="p-4 bg-yellow-25/5 border border-yellow-25/10 text-yellow-100 rounded-2xl flex items-start gap-3">
                <FaExclamationTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold">Certificate is not available yet.</p>
                  <p className="text-richblack-300 mt-1">
                    {!reasons?.progressComplete && '• Please make sure you mark all lessons as complete. '}
                    {!reasons?.certificatePublished && '• Waiting for the instructor to publish the certificates.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Certificate Information Panel */}
          <div className="flex flex-col justify-between">
            {certificate ? (
              <div className="p-6 bg-richblack-900/60 border border-richblack-700 rounded-2xl flex flex-col justify-center h-full">
                <h3 className="text-lg font-semibold text-richblack-25 mb-4">Certificate Metadata</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                  <div>
                    <span className="text-richblack-300 block text-xs uppercase tracking-wider">Recipient Name</span>
                    <span className="font-semibold text-richblack-5">{certificate.studentName}</span>
                  </div>
                  <div>
                    <span className="text-richblack-300 block text-xs uppercase tracking-wider">Course Name</span>
                    <span className="font-semibold text-richblack-5">{certificate.courseName}</span>
                  </div>
                  <div>
                    <span className="text-richblack-300 block text-xs uppercase tracking-wider">Authorized Instructor</span>
                    <span className="font-semibold text-richblack-5">{certificate.instructorName}</span>
                  </div>
                  <div>
                    <span className="text-richblack-300 block text-xs uppercase tracking-wider">Platform</span>
                    <span className="font-semibold text-richblack-5">{certificate.platformName}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-richblack-300 block text-xs uppercase tracking-wider">Certificate UID</span>
                    <span className="font-mono text-xs text-yellow-50">{certificate.certificateId}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 border border-dashed border-richblack-700 rounded-2xl flex flex-col items-center justify-center text-center h-full min-h-[180px]">
                <div className="text-richblack-400 text-5xl mb-3">📜</div>
                <h4 className="font-semibold text-richblack-100">Certificate not yet issued</h4>
                <p className="text-xs text-richblack-300 mt-1 max-w-[280px]">
                  Once requirements are met, your certificate will be generated and register ID will appear here.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={handleDownload}
                disabled={!canDownload || downloading}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold transition-transform duration-200 active:scale-[0.98] ${
                  canDownload
                    ? 'bg-yellow-50 text-richblack-900 hover:bg-yellow-100'
                    : 'bg-richblack-800 text-richblack-400 border border-richblack-700 cursor-not-allowed'
                }`}
              >
                <FaDownload />
                {downloading ? 'Downloading...' : 'Download PDF'}
              </button>

              <button
                onClick={handleEmail}
                disabled={!canDownload || emailing}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold transition-transform duration-200 active:scale-[0.98] ${
                  canDownload
                    ? 'border border-richblack-600 hover:bg-richblack-700 text-richblack-5'
                    : 'bg-richblack-800 text-richblack-400 border border-richblack-700 cursor-not-allowed'
                }`}
              >
                <FaEnvelope />
                {emailing ? 'Emailing...' : 'Email to Me'}
              </button>
            </div>

            <button
              onClick={checkEligibility}
              className="w-full mt-4 text-center text-sm font-medium text-yellow-50 hover:underline transition-all duration-150"
            >
              🔄 Refresh Status
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CertificateSection;
