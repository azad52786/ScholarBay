import React, { useEffect, useState } from 'react';
import { HiMenuAlt1 } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Apiconnection from '../../service/Apiconnection';
import { COURSE_API } from '../../service/Api';
import Mainvideo from './Mainvideo';
import "video-react/dist/video-react.css"
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import CourseCompletedModal from './CourseCompletedModal';

const ReadingPane = ({ lesson }) => {
  const markdownContent = lesson?.markdownContent || lesson?.description || "";
  console.log(lesson);
  console.log(markdownContent);
  console.log(typeof markdownContent);
  console.log(React.isValidElement(markdownContent));
  return (
    <div className="mx-auto w-[97%] py-5">
      <div className="rounded-3xl border border-richblack-600 bg-richblack-800/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-8">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-richblack-700 pb-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-caribbeangreen-200">Reading Pane</p>
            <h2 className="mt-2 text-2xl font-semibold text-richblack-5">{lesson?.title}</h2>
          </div>
          <div className="rounded-full border border-richblack-600 bg-richblack-900 px-4 py-2 text-xs text-richblack-100">
            Markdown Lesson
          </div>
        </div>

        <div className="space-y-6 text-richblack-25 leading-8">
          <Markdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-richblack-5">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold text-richblack-5">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-richblack-5">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-base leading-8 text-richblack-25">{children}</p>
              ),
              ul: ({ children }) => <ul className="ml-6 list-disc space-y-2 text-richblack-25">{children}</ul>,
              ol: ({ children }) => <ol className="ml-6 list-decimal space-y-2 text-richblack-25">{children}</ol>,
              li: ({ children }) => <li className="pl-1">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-yellow-50 bg-yellow-50/10 px-4 py-3 text-yellow-100">
                  {children}
                </blockquote>
              ),
              code: ({ className, children, ...props }) => {
                const isBlock = Boolean(className); // language-js, language-py, etc.

                if (isBlock) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }

                return (
                  <code
                    className="rounded bg-richblack-900 px-1.5 py-0.5 text-sm text-caribbeangreen-200"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="overflow-x-auto rounded-2xl bg-richblack-900 p-4 text-sm text-richblack-25">
                  {children}
                </pre>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-richblack-5">{children}</strong>
              ),
            }}
          >
            {markdownContent}
          </Markdown>
        </div>
      </div>
    </div>
  );
};

const QuizAssessmentCard = ({ lesson }) => {
  const quizData = Array.isArray(lesson?.quizData) ? lesson.quizData : [];
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const submitQuiz = () => {
    const calculatedScore = quizData.reduce((currentScore, question, index) => {
      const selectedOption = selectedAnswers[index];
      return selectedOption === question.correctOptionIndex ? currentScore + 1 : currentScore;
    }, 0);

    setScore(calculatedScore);
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  if (quizData.length === 0) {
    return (
      <div className="mx-auto w-[97%] py-5">
        <div className="rounded-3xl border border-richblack-600 bg-richblack-800 p-6 text-richblack-25">
          No quiz data is available for this lesson yet.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[97%] py-5">
      <div className="rounded-3xl border border-richblack-600 bg-richblack-800/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-8">
        <div className="mb-6 flex flex-col gap-3 border-b border-richblack-700 pb-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-yellow-100">Assessment</p>
            <h2 className="mt-2 text-2xl font-semibold text-richblack-5">{lesson?.title}</h2>
          </div>
          <div className="rounded-full border border-richblack-600 bg-richblack-900 px-4 py-2 text-xs text-richblack-100">
            {quizData.length} Questions
          </div>
        </div>

        {submitted && (
          <div className="mb-6 rounded-2xl border border-caribbeangreen-300/30 bg-caribbeangreen-300/10 p-4 text-caribbeangreen-100">
            Score: {score}/{quizData.length} ({Math.round((score / quizData.length) * 100)}%)
          </div>
        )}

        <div className="space-y-5">
          {quizData.map((question, questionIndex) => (
            <div key={`${questionIndex}-${question.questionText}`} className="rounded-2xl border border-richblack-700 bg-richblack-900 p-4">
              <div className="flex items-start justify-between gap-4">
                <p className="text-base font-semibold text-richblack-5">
                  {questionIndex + 1}. {question.questionText}
                </p>
                {submitted && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${selectedAnswers[questionIndex] === question.correctOptionIndex
                      ? "bg-caribbeangreen-300/20 text-caribbeangreen-100"
                      : "bg-red-300/20 text-red-100"
                      }`}
                  >
                    {selectedAnswers[questionIndex] === question.correctOptionIndex ? "Correct" : "Incorrect"}
                  </span>
                )}
              </div>

              <div className="mt-4 grid gap-3">
                {question.options.map((option, optionIndex) => {
                  const isCorrect = optionIndex === question.correctOptionIndex;
                  const isSelected = selectedAnswers[questionIndex] === optionIndex;

                  return (
                    <button
                      type="button"
                      key={`${questionIndex}-${optionIndex}`}
                      onClick={() =>
                        !submitted &&
                        setSelectedAnswers((previous) => ({
                          ...previous,
                          [questionIndex]: optionIndex,
                        }))
                      }
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-200 ${submitted
                        ? isCorrect
                          ? "border-caribbeangreen-300 bg-caribbeangreen-300/10 text-caribbeangreen-100"
                          : isSelected
                            ? "border-red-300 bg-red-300/10 text-red-100"
                            : "border-richblack-700 bg-richblack-800 text-richblack-200"
                        : isSelected
                          ? "border-yellow-50 bg-yellow-50/10 text-yellow-50"
                          : "border-richblack-700 bg-richblack-800 text-richblack-200 hover:border-yellow-50/40"
                        }`}
                    >
                      <span className="pr-4 text-sm">{option}</span>
                      {submitted && isCorrect && (
                        <span className="text-xs font-semibold uppercase tracking-[0.2em]">Correct answer</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={submitQuiz}
            className="rounded-md bg-yellow-100 px-5 py-3 font-semibold text-richblack-900 transition-transform duration-200 hover:scale-[0.98]"
          >
            Submit Answers
          </button>
          {submitted && (
            <button
              type="button"
              onClick={resetQuiz}
              className="rounded-md border border-richblack-600 bg-richblack-900 px-5 py-3 font-semibold text-richblack-100 transition-transform duration-200 hover:scale-[0.98]"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const VideoSection = ({ setShowVideoSlider, courseProgress, setCourseProgress }) => {
  const { courseEntireData, courseSectionData, completedLecture } = useSelector((store) => store.CourseVideo);
  const { token } = useSelector((store) => store.Auth)
  let { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [videoData, setVideoData] = useState(null);
  const [preViewPicture, setPreViewPicture] = useState(null);
  const [videoEnd, setVideoEnd] = useState(false);
  const { courseName, thumbnail } = courseEntireData || {};
  const [noLec, setNoLec] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  // fetch the video
  useEffect(() => {
    // make undefined -> string i take it from params it took a lot's of time to find this error 
    if (sectionId === "undefined" || subSectionId === "undefined") {
      setNoLec(true)
      return;
    } else {
      if (noLec) {
        setNoLec(false);
      }
    }
    if (courseId === "undefined") {
      navigate('/dashboard/default/enrolled-courses');
      return;
    }
    let sectionData = courseSectionData?.filter((section) => section?._id === sectionId);
    let subSectionData = sectionData?.[0]?.subSection?.filter((subSec) => subSec?._id === subSectionId);
    setVideoData(subSectionData?.[0]);
    setPreViewPicture(thumbnail);

    setVideoEnd(false);
  }, [courseEntireData, courseSectionData, location.pathname]);

  const isFirstVideo = () => {
    const indexOfSection = courseSectionData?.findIndex((section) => section?._id === sectionId);
    const indexOfSubSection = courseSectionData?.[indexOfSection]?.subSection?.findIndex((subSec) => subSec?._id === subSectionId);
    return indexOfSection === 0 && indexOfSubSection === 0;
  };

  const isLastVideo = () => {
    const indexOfSection = courseSectionData?.findIndex((section) => section?._id === sectionId);

    const noOfSection = courseSectionData?.length;
    const noOfSubSection = courseSectionData?.[indexOfSection]?.subSection?.length;
    const indexOfSubSection = courseSectionData?.[indexOfSection]?.subSection?.findIndex((subSec) => subSec?._id === subSectionId);
    return indexOfSection === noOfSection - 1 && indexOfSubSection === noOfSubSection - 1;
  };

  const goToNextHandeler = async () => {
    if (!videoData) return;
    if (!courseProgress.includes(videoData._id)) {
      try {
        const res = await Apiconnection('put', COURSE_API.MARKED_SUBSECTION + '/' + videoData?._id, null, {
          Authorization: `Bearer ${token}`
        }, {
          courseId: courseId,
        })
        if (res.data.success) {
          setCourseProgress(res.data.data)
          //  dispatch(updateCompletedLecture(videoData._id))
          if (res.data.isComplete) {
            // fetch or create certificate
            try {
              const certRes = await Apiconnection('post', `${COURSE_API.COURSE_DETAILS}/certificates/create`, null, { Authorization: `Bearer ${token}` }, { courseId });
              if (certRes.data?.success) {
                setCertificateData(certRes.data.certificate);
                setShowCompleteModal(true);
              }
            } catch (e) {
              console.error('Certificate create/fetch failed', e);
            }
          }
        } else {
          throw new Error("SomeThing Went Wrong");
        }
      } catch (e) {
        console.error(e);
        if (e.response && e.response.status === 420) {
          toast.error(e.response.data.message);
        }
        return;
      }
    }
    const indexOfSection = courseSectionData?.findIndex((section) => section?._id === sectionId);
    const noOfSubSection = courseSectionData?.[indexOfSection]?.subSection?.length;

    const indexOfSubSection = courseSectionData?.[indexOfSection]?.subSection?.findIndex((subSec) => subSec?._id === subSectionId);
    let nextSectionId, nextSubSectionId;
    if (indexOfSubSection < noOfSubSection - 1) {
      nextSectionId = sectionId;
      nextSubSectionId = courseSectionData?.[indexOfSection]?.subSection?.[indexOfSubSection + 1]?._id;
    } else {
      nextSectionId = courseSectionData?.[indexOfSection + 1]?._id;
      nextSubSectionId = courseSectionData?.[indexOfSection + 1]?.subSection?.[0]?._id;
    }
    navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
  };

  const goToPreViousHandeler = () => {
    const indexOfSection = courseSectionData?.findIndex((section) => section?._id === sectionId);

    let preSectionId, preSubSectionId;

    const indexOfSubSection = courseSectionData?.[indexOfSection]?.subSection?.findIndex((subSec) => subSec?._id === subSectionId);

    if (indexOfSubSection > 0) {
      preSectionId = sectionId;
      preSubSectionId = courseSectionData?.[indexOfSection]?.subSection?.[indexOfSubSection - 1]?._id;
    } else {
      preSectionId = courseSectionData?.[indexOfSection - 1]?._id;
      const noOfSubSection = courseSectionData?.[indexOfSection - 1]?.subSection?.length;

      preSubSectionId = courseSectionData?.[indexOfSection - 1]?.subSection?.[noOfSubSection - 1]?._id;
    }
    navigate(`/view-course/${courseId}/section/${preSectionId}/sub-section/${preSubSectionId}`);
  };

  return (
    <div className='h-full w-full font-edu-sa'>
      <div className='h-[80px] w-full bg-richblack-800 bg-opacity-50 px-2 flex items-center justify-between border-b border-richblack-500 border-opacity-60'>
        <div className='flex md:gap-3'>
          <HiMenuAlt1
            className='md:w-10 md:h-10 w-6 h-6 text-pure-greys-300 lg:hidden cursor-pointer'
            onClick={() => setShowVideoSlider((prev) => !prev)}
          />
          <p className='pl-2 md:pl-5 font-semibold md:font-bold text-base md:text-2xl text-richblack-300'>{courseName}</p>
        </div>
        <div className=' pr-4'>
          {
            courseSectionData && courseSectionData.length > 0 &&
            <div className=' '>

              {
                !isFirstVideo() && <button
                  className=' py-1 px-2 mb-1 md:mb-0  md:py-2 md:px-3 mr-2 bg-blue-100 border-b-2 border-l text-richblack-800 border-white rounded-md md:text-lg md:font-semibold'
                  onClick={goToPreViousHandeler}
                >Previous</button>
              }
              {
                !isLastVideo() && <button
                  className='  py-1 px-2 md:py-2 md:px-3 mr-2  bg-yellow-100 text-richblue-800 border-b-2 border-r border-white rounded-md md:text-lg md:font-semibold'

                  onClick={goToNextHandeler}
                >{courseProgress.includes(videoData?._id) ? "Next" : "Mark And Next"}</button>
              }
            </div>
          }
        </div>

        {/* if subsectionid is undefined Please show a message no lecture found */}
      </div>
      {
        noLec ? (<div className=' flex items-center justify-center w-full h-[400px] text-2xl font-bold'
          style={{
            background: "linear-gradient(90deg, rgba(126,98,237,1) 0%, rgba(68,216,53,1) 36%, rgba(52,216,118,1) 49%, rgba(210,95,224,1) 100%)",
            backgroundClip: "text",
            color: 'transparent'

          }}
        >No Lesson Found !!!</div>) : (
          (videoData?.contentType || "VIDEO") === "VIDEO" ? (
            <Mainvideo videoData={videoData} thumbnail={thumbnail} preViewPicture={preViewPicture} videoEnd={videoEnd} />
          ) : (videoData?.contentType || "VIDEO") === "TEXT_NOTE" ? (
            <ReadingPane lesson={videoData} />
          ) : (
            <QuizAssessmentCard lesson={videoData} />
          )
        )
      }

    </div>
  );
};

export default VideoSection;
