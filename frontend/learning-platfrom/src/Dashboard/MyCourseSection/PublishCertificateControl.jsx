import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaCertificate, FaRegFileAlt, FaSpinner } from 'react-icons/fa';
import Apiconnection from '../../service/Apiconnection';
import { CERTIFICATE_API } from '../../service/Api';
import toast from 'react-hot-toast';

const PublishCertificateControl = ({ courseId }) => {
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { token } = useSelector((store) => store.Auth);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        const response = await Apiconnection(
          'GET',
          `${CERTIFICATE_API.GET_STATUS}?courseId=${courseId}`,
          null,
          { Authorization: `Bearer ${token}` }
        );
        if (response.data?.success) {
          setPublished(response.data.certificatePublished);
        }
      } catch (err) {
        console.error('Error fetching certificate status:', err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId && token) {
      fetchStatus();
    }
  }, [courseId, token]);

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setUpdating(true);
      const endpoint = published ? CERTIFICATE_API.UNPUBLISH : CERTIFICATE_API.PUBLISH;
      const toastId = toast.loading(published ? "Unpublishing certificates..." : "Publishing certificates...");

      const response = await Apiconnection(
        'POST',
        endpoint,
        { courseId },
        { Authorization: `Bearer ${token}` }
      );

      toast.dismiss(toastId);
      if (response.data?.success) {
        setPublished(!published);
        toast.success(
          published
            ? 'Certificates unpublished successfully!'
            : 'Certificates published! Eligible students can now download them.'
        );
      } else {
        toast.error(response.data?.message || 'Failed to update certificate status');
      }
    } catch (err) {
      console.error('Error updating certificate:', err);
      toast.error(err.response?.data?.message || 'Failed to update certificate status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-1.5 py-1 px-3 text-xs text-richblack-400 bg-richblack-800 rounded-3xl w-fit">
        <FaSpinner className="animate-spin w-3 h-3" />
        <span>Loading Cert...</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={updating}
      title={published ? "Click to disable student certificates" : "Click to enable student certificates"}
      className={`rounded-3xl flex items-center py-1 md:px-4 px-3 justify-around w-fit text-xs gap-x-2 border transition-all duration-150 ${
        published
          ? "bg-[#14e822]/10 border-[#14e822] text-[#14e822] hover:bg-[#14e822]/20"
          : "bg-orange-500/10 border-orange-500/30 text-orange-500 hover:bg-orange-500/20"
      } disabled:opacity-50`}
    >
      <div className="flex items-center gap-1.5">
        {updating ? (
          <FaSpinner className="animate-spin w-3 h-3" />
        ) : published ? (
          <FaCertificate className="w-3 h-3 animate-pulse" />
        ) : (
          <FaRegFileAlt className="w-3 h-3" />
        )}
        <span className="font-semibold font-edu-sa">
          {updating ? 'Updating...' : published ? 'Cert: Enabled' : 'Cert: Disabled'}
        </span>
      </div>
    </button>
  );
};

export default PublishCertificateControl;
