import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Apiconnection from '../../service/Apiconnection';
import { PROGRESS_API } from '../../service/Api';

const ProgressBar = ({ courseId }) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((store) => store.Auth);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await Apiconnection(
          "GET",
          `${PROGRESS_API.GET_PROGRESS}?courseId=${courseId}`,
          null,
          {
            Authorization: `Bearer ${token}`
          }
        );
        if (response.data?.success) {
          setProgress(response.data.data.progressPercentage || 0);
        }
      } catch (e) {
        console.error("Error fetching course progress:", e);
      } finally {
        setLoading(false);
      }
    };

    if (courseId && token) {
      fetchProgress();
    } else {
      setLoading(false);
    }
  }, [courseId, token]);

  if (loading) {
    return <div className="text-xs font-mono text-richblack-300">...</div>;
  }

  return (
    <div className='h-2 w-32 bg-white rounded-md relative'>
      <span
        style={{
          background : "linear-gradient(90deg, rgba(126,98,237,1) 0%, rgba(123,163,228,1) 21%, rgba(78,196,84,1) 36%, rgba(114,207,104,1) 62%, rgba(52,216,118,1) 80%, rgba(210,95,224,1) 100%)" , 
          width : `${progress}%` 
        }}
        after-ele-width={`${progress}%`}
        className={`absolute inline-block h-full progress rounded-md scale-0`}
      ></span>
    </div>
  )
}

export default ProgressBar

