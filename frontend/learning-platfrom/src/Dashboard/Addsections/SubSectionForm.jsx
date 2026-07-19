import React, { useEffect, useMemo, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import {
  removeSubsection,
} from "../../Store/Slices/SubSectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FiUploadCloud, FiPlus, FiTrash2 } from "react-icons/fi";
import ErrorMessageComponent from "../AddCourse/ErrorMessageComponent";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import {
  createSubSection,
  updateSubSection,
} from "../../service/operations/CourseBackendConnection";
import { setCourseDetails } from "../../Store/Slices/CreateCourseSlice";
import toast from "react-hot-toast";

const CONTENT_TYPES = [
  { value: "VIDEO", label: "Video Lesson" },
  { value: "TEXT_NOTE", label: "Markdown Document" },
  { value: "QUIZ_ASSESSMENT", label: "Quiz Assessment" },
];

const createQuestion = () => ({
  questionText: "",
  options: ["", ""],
  correctOptionIndex: 0,
});

const sanitizeQuizData = (quizData) => {
  if (!Array.isArray(quizData) || quizData.length === 0) {
    return [createQuestion()];
  }

  return quizData.map((question) => ({
    questionText: question?.questionText || "",
    options:
      Array.isArray(question?.options) && question.options.length > 0
        ? question.options
        : ["", ""],
    correctOptionIndex:
      typeof question?.correctOptionIndex === "number"
        ? question.correctOptionIndex
        : 0,
  }));
};

const SubSectionForm = () => {
  const dispatch = useDispatch();
  const videoInput = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [contentType, setContentType] = useState("VIDEO");
  const [quizQuestions, setQuizQuestions] = useState([createQuestion()]);
  const { courseDetails } = useSelector((store) => store.CourseData);
  const { sectionId, subsectionDetails, editSubSection } = useSelector(
    (store) => store.SubSectionData
  );
  const { token } = useSelector((store) => store.Auth);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
    shouldUnregister: true,
    defaultValues: {
      title: "",
      description: "",
      hours: "",
      minutes: "",
      markdownContent: "",
      video: null,
    },
  });

  const contentTypeMeta = useMemo(
    () => CONTENT_TYPES.find((item) => item.value === contentType),
    [contentType]
  );

  const isVideo = contentType === "VIDEO";
  const isTextNote = contentType === "TEXT_NOTE";
  const isQuiz = contentType === "QUIZ_ASSESSMENT";

  const fileSubmitHandeler = (file) => {
    if (!file) {
      return;
    }

    setVideoFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreviewFile(previewUrl);
    setValue("video", file, { shouldValidate: true });
  };

  const cancelVideoHandeler = () => {
    setPreviewFile(null);
    setVideoFile(null);
    setValue("video", null, { shouldValidate: true });
  };

  const updateQuestion = (questionIndex, field, value) => {
    setQuizQuestions((previousQuestions) =>
      previousQuestions.map((question, index) =>
        index === questionIndex ? { ...question, [field]: value } : question
      )
    );
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    setQuizQuestions((previousQuestions) =>
      previousQuestions.map((question, index) => {
        if (index !== questionIndex) {
          return question;
        }

        const options = [...question.options];
        options[optionIndex] = value;
        return { ...question, options };
      })
    );
  };

  const addQuestion = () => {
    setQuizQuestions((previousQuestions) => [...previousQuestions, createQuestion()]);
  };

  const removeQuestion = (questionIndex) => {
    setQuizQuestions((previousQuestions) => {
      if (previousQuestions.length === 1) {
        return [createQuestion()];
      }

      return previousQuestions.filter((_, index) => index !== questionIndex);
    });
  };

  const addOption = (questionIndex) => {
    setQuizQuestions((previousQuestions) =>
      previousQuestions.map((question, index) => {
        if (index !== questionIndex) {
          return question;
        }

        return {
          ...question,
          options: [...question.options, ""],
        };
      })
    );
  };

  const removeOption = (questionIndex, optionIndex) => {
    setQuizQuestions((previousQuestions) =>
      previousQuestions.map((question, index) => {
        if (index !== questionIndex || question.options.length <= 2) {
          return question;
        }

        const options = question.options.filter((_, currentIndex) => currentIndex !== optionIndex);
        let correctOptionIndex = question.correctOptionIndex;

        if (optionIndex === correctOptionIndex) {
          correctOptionIndex = 0;
        } else if (optionIndex < correctOptionIndex) {
          correctOptionIndex -= 1;
        }

        return {
          ...question,
          options,
          correctOptionIndex,
        };
      })
    );
  };

  const createForm = (data) => {
    const formData = new FormData();
    formData.append("courseId", courseDetails._id);

    if (!editSubSection) {
      formData.append("sectionId", sectionId);
    }

    if (editSubSection) {
      formData.append("subSectionId", subsectionDetails._id);
    }

    formData.append("title", data.title);
    formData.append("contentType", contentType);

    if (isVideo) {
      formData.append("description", data.description || "");
      formData.append("hours", data.hours);
      formData.append("minutes", data.minutes);

      if (data.video instanceof File) {
        formData.append("video", data.video);
      } else if (typeof data.video === "string" && data.video) {
        formData.append("video", data.video);
      }
    }

    if (isTextNote) {
      formData.append("markdownContent", data.markdownContent || "");
      formData.append("description", data.description || "");
    }

    if (isQuiz) {
      formData.append("description", data.description || "");
      formData.append("quizData", JSON.stringify(quizQuestions));
    }

    return formData;
  };

  const validateQuizQuestions = () => {
    for (const question of quizQuestions) {
      if (!question.questionText.trim()) {
        toast.error("Every quiz question needs text.");
        return false;
      }

      const hasAtLeastTwoOptions = question.options.filter((option) => option.trim()).length >= 2;
      if (!hasAtLeastTwoOptions) {
        toast.error("Each question needs at least two answer options.");
        return false;
      }

      if (
        question.correctOptionIndex < 0 ||
        question.correctOptionIndex >= question.options.length ||
        !question.options[question.correctOptionIndex].trim()
      ) {
        toast.error("Please mark a valid correct answer for every question.");
        return false;
      }
    }

    return true;
  };

  const onsubmit = async (data) => {
    console.log(data);
    if (isQuiz && !validateQuizQuestions()) {
      return;
    }

    if (editSubSection) {
      const hasChanges =
        data.title !== (subsectionDetails?.title || "") ||
        contentType !== (subsectionDetails?.contentType || "VIDEO") ||
        (isVideo &&
          (data.description !== (subsectionDetails?.description || "") ||
            data.hours !== (subsectionDetails?.hours || "") ||
            data.minutes !== (subsectionDetails?.minutes || "") ||
            data.video !== subsectionDetails?.videoUrl)) ||
        (isTextNote && data.markdownContent !== (subsectionDetails?.markdownContent || "")) ||
        (isQuiz &&
          JSON.stringify(quizQuestions) !==
          JSON.stringify(sanitizeQuizData(subsectionDetails?.quizData)));

      if (!hasChanges) {
        toast.error("You didn't change anything. What do you want to update?🤔");
        return;
      }
    }

    const formData = createForm(data);
    const response = editSubSection
      ? await updateSubSection(formData, token)
      : await createSubSection(formData, token);

    if (response?.updatedCourse) {
      dispatch(setCourseDetails(response.updatedCourse));
    }

    dispatch(removeSubsection());
  };

  useEffect(() => {
    if (!editSubSection || !subsectionDetails) {
      return;
    }

    const detectedContentType =
      subsectionDetails.contentType ||
      (subsectionDetails.quizData?.length
        ? "QUIZ_ASSESSMENT"
        : subsectionDetails.markdownContent
          ? "TEXT_NOTE"
          : "VIDEO");

    setContentType(detectedContentType);
    setValue("title", subsectionDetails.title || "");
    setValue("description", subsectionDetails.description || "");
    setValue("hours", subsectionDetails.hours || "");
    setValue("minutes", subsectionDetails.minutes || "");
    setValue("markdownContent", subsectionDetails.markdownContent || "");
    setValue("video", subsectionDetails.videoUrl || null);

    if (detectedContentType === "VIDEO") {
      setPreviewFile(subsectionDetails.videoUrl || null);
      setVideoFile(null);
    }

    if (detectedContentType === "QUIZ_ASSESSMENT") {
      setQuizQuestions(sanitizeQuizData(subsectionDetails.quizData));
    }
  }, [editSubSection, subsectionDetails, setValue]);

  useEffect(() => {
    if (!isVideo) {
      setPreviewFile(null);
      setVideoFile(null);
      setValue("video", null);
    } else if (editSubSection && subsectionDetails?.videoUrl && !videoFile) {
      setPreviewFile(subsectionDetails.videoUrl);
    }
  }, [contentType]);

  return (
    <div className="absolute left-0 top-0 z-30 flex min-h-screen w-screen items-center justify-center bg-richblack-950/40 pb-52 pt-2 font-inter backdrop-blur-sm">
      <div className="h-fit w-[92%] lg:w-[60%]">
        <div className="flex items-center justify-between rounded-t-2xl border border-richblack-600 bg-richblack-600 px-4 py-3 text-lg font-semibold text-pure-greys-200 font-edu-sa">
          <div>
            <p className="text-[#32fee6]">Edit Lesson</p>
            <p className="text-xs uppercase tracking-[0.25em] text-richblack-300">
              {contentTypeMeta?.label}
            </p>
          </div>
          <ImCross
            onClick={() => {
              dispatch(removeSubsection());
            }}
            className="cursor-pointer"
          />
        </div>

        <form
          className="rounded-b-2xl border border-t-0 border-richblack-700 bg-richblack-700 px-4 py-5 md:px-8"
          onSubmit={handleSubmit(onsubmit)}
        >
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-pure-greys-25">
              Content Type <sup className="text-red-400">*</sup>
            </label>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {CONTENT_TYPES.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  onClick={() => setContentType(item.value)}
                  className={`rounded-xl border px-4 py-3 text-left transition-all duration-200 ${contentType === item.value
                    ? "border-yellow-50 bg-yellow-50/10 text-yellow-50"
                    : "border-richblack-600 bg-richblack-800 text-richblack-100 hover:border-richblack-500"
                    }`}
                >
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="mt-1 text-xs text-richblack-300">
                    {item.value === "VIDEO" && "Upload a lesson video."}
                    {item.value === "TEXT_NOTE" && "Write markdown notes."}
                    {item.value === "QUIZ_ASSESSMENT" && "Create an auto-graded assessment."}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full space-y-2 text-pure-greys-200">
            <label htmlFor="title" className="block text-sm font-semibold text-pure-greys-25">
              Lesson Title <sup className="text-red-400">*</sup>
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter your lesson title"
              className="w-full rounded-lg border border-richblack-600 bg-richblack-800 px-4 py-3 text-richblack-25 placeholder-richblack-400 transition-all duration-200 focus:border-yellow-50 focus:outline-none hover:border-richblack-500"
              {...register("title", { required: "Title is Required" })}
            />
            <ErrorMessageComponent name={"title"} errors={errors} />
          </div>

          {isVideo && (
            <>
              <div className="mt-6 space-y-3">
                <label htmlFor="video" className="block text-sm font-semibold text-pure-greys-25">
                  Lesson Video <sup className="text-red-400">*</sup>
                </label>
                {!previewFile ? (
                  <>
                    <input
                      id="video"
                      type="file"
                      accept="video/mp4,video/x-m4v,video/*"
                      ref={(element) => {
                        register("video");
                        videoInput.current = element;
                      }}
                      hidden
                      onChange={(event) => fileSubmitHandeler(event.target.files[0])}
                    />
                    <div
                      className="relative space-y-3"
                      onDragOver={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onDrop={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        fileSubmitHandeler(event.dataTransfer.files[0]);
                      }}
                    >
                      <div
                        className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-richblack-500 bg-richblack-800 px-6 py-12 transition-all duration-200 hover:border-yellow-50 hover:bg-richblack-800/70"
                        onClick={() => videoInput.current?.click()}
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-yellow-50 bg-richblack-900">
                          <FiUploadCloud className="h-8 w-8 text-yellow-50" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-pure-greys-25">
                            Drag and drop your video, or <span className="text-yellow-50">browse</span>
                          </p>
                          <p className="mt-2 text-xs text-richblack-300">
                            MP4, MOV, or other video formats (Max 12MB)
                          </p>
                        </div>
                      </div>
                      <ErrorMessageComponent name={"video"} errors={errors} />
                    </div>
                  </>
                ) : (
                  <div className="rounded-xl border border-richblack-600 bg-richblack-900 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm font-semibold text-pure-greys-25">Video Preview</p>
                      <button
                        type="button"
                        onClick={cancelVideoHandeler}
                        className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 transition-all duration-200 hover:border-red-400 hover:bg-red-500/20"
                      >
                        Change Video
                      </button>
                    </div>
                    <video className="w-full rounded-lg" controls>
                      <source src={previewFile} />
                    </video>
                  </div>
                )}
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="hours" className="block text-sm font-semibold text-pure-greys-25">
                    Video Playback Hours <sup className="text-red-400">*</sup>
                  </label>
                  <input
                    type="number"
                    id="hours"
                    placeholder="0-2"
                    className="w-full rounded-lg border border-richblack-600 bg-richblack-800 px-4 py-3 text-richblack-25 placeholder-richblack-400 transition-all duration-200 focus:border-yellow-50 focus:outline-none hover:border-richblack-500"
                    {...register("hours", {
                      required: {
                        value: true,
                        message: "Time is Required",
                      },
                      max: {
                        value: 2,
                        message: "Maximum Hour is Two",
                      },
                      pattern: {
                        value: /\d+/,
                        message: "This input is number only.",
                      },
                    })}
                  />
                  <ErrorMessageComponent name={"hours"} errors={errors} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="minutes" className="block text-sm font-semibold text-pure-greys-25">
                    Video Playback Minutes <sup className="text-red-400">*</sup>
                  </label>
                  <input
                    type="text"
                    id="minutes"
                    placeholder="0-59"
                    className="w-full rounded-lg border border-richblack-600 bg-richblack-800 px-4 py-3 text-richblack-25 placeholder-richblack-400 transition-all duration-200 focus:border-yellow-50 focus:outline-none hover:border-richblack-500"
                    {...register("minutes", {
                      required: {
                        value: true,
                        message: "Time is Required",
                      },
                      max: {
                        value: 59,
                        message: "Maximum Minutes is 59",
                      },
                      pattern: {
                        value: /\d+/,
                        message: "This input is number only.",
                      },
                    })}
                  />
                  <ErrorMessageComponent name={"minutes"} errors={errors} />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label htmlFor="description" className="block text-sm font-semibold text-pure-greys-25">
                  Video Description <sup className="text-red-400">*</sup>
                </label>
                <textarea
                  id="description"
                  placeholder="Enter a short lesson description..."
                  className="w-full resize-none rounded-lg border border-richblack-600 bg-richblack-800 px-4 py-3 text-richblack-25 placeholder-richblack-400 transition-all duration-200 focus:border-yellow-50 focus:outline-none hover:border-richblack-500"
                  rows="5"
                  {...register("description", { required: "Description is Required" })}
                />
                <ErrorMessageComponent name={"description"} errors={errors} />
              </div>
            </>
          )}

          {isTextNote && (
            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-richblack-600 bg-richblack-800 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-100">
                  Markdown Editor
                </p>
                <p className="mt-2 text-sm text-richblack-300">
                  Write your lesson notes in Markdown format. Supports headings, bold, italic, code blocks, and more.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="markdownContent" className="block text-sm font-semibold text-pure-greys-25">
                  Markdown Content <sup className="text-red-400">*</sup>
                </label>
                <textarea
                  id="markdownContent"
                  placeholder="# Heading 1&#10;## Heading 2&#10;&#10;Write your **markdown** content here...&#10;&#10;- Bullet point&#10;- Another point&#10;&#10;`Code snippets`"
                  className="w-full resize-y rounded-lg border border-richblack-600 bg-richblack-900 px-4 py-3 font-mono text-sm leading-7 text-richblack-25 placeholder-richblack-500 transition-all duration-200 focus:border-yellow-50 focus:outline-none hover:border-richblack-500"
                  rows="13"
                  {...register("markdownContent", {
                    required: "Markdown notes are required for this content type",
                  })}
                />
                <ErrorMessageComponent name={"markdownContent"} errors={errors} />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-semibold text-pure-greys-25">
                  Lesson Description
                </label>
                <textarea
                  id="description"
                  placeholder="Add a description for this lesson..."
                  className="w-full resize-none rounded-lg border border-richblack-600 bg-richblack-800 px-4 py-3 text-richblack-25 placeholder-richblack-400 transition-all duration-200 focus:border-yellow-50 focus:outline-none hover:border-richblack-500"
                  rows="4"
                  {...register("description")}
                />
              </div>
            </div>
          )}

          {isQuiz && (
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-richblack-600 bg-richblack-800 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-100">
                  Quiz Builder
                </p>
                <p className="mt-2 text-sm text-richblack-300">
                  Create multiple-choice questions. Select the correct answer with the radio button, then add or remove options as needed.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-semibold text-pure-greys-25">
                  Quiz Description
                </label>
                <textarea
                  id="description"
                  placeholder="Describe this assessment for students..."
                  className="w-full resize-none rounded-lg border border-richblack-600 bg-richblack-800 px-4 py-3 text-richblack-25 placeholder-richblack-400 transition-all duration-200 focus:border-yellow-50 focus:outline-none hover:border-richblack-500"
                  rows="3"
                  {...register("description")}
                />
              </div>

              {quizQuestions.map((question, questionIndex) => (
                <div
                  key={`question-${questionIndex}`}
                  className="rounded-xl border border-richblack-600 bg-richblack-800 p-5 shadow-lg"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-50 text-sm font-bold text-richblack-900">
                        {questionIndex + 1}
                      </div>
                      <p className="text-sm font-semibold text-pure-greys-25">Question</p>
                    </div>
                    {quizQuestions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(questionIndex)}
                        className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300 transition-all duration-200 hover:border-red-400 hover:bg-red-500/20"
                      >
                        <FiTrash2 className="h-4 w-4" /> Remove
                      </button>
                    )}
                  </div>

                  <div className="mb-5 space-y-2">
                    <label className="block text-sm font-semibold text-pure-greys-25">
                      Question Text <sup className="text-red-400">*</sup>
                    </label>
                    <textarea
                      value={question.questionText}
                      onChange={(event) =>
                        updateQuestion(questionIndex, "questionText", event.target.value)
                      }
                      className="w-full resize-y rounded-lg border border-richblack-600 bg-richblack-900 px-4 py-3 text-richblack-25 placeholder-richblack-500 transition-all duration-200 focus:border-yellow-50 focus:outline-none hover:border-richblack-500"
                      rows="3"
                      placeholder="What is your question?"
                    />
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-pure-greys-25">
                      Answer Options <sup className="text-red-400">*</sup>
                    </p>
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={`question-${questionIndex}-option-${optionIndex}`}
                        className="flex items-stretch gap-3 rounded-lg border border-richblack-600 bg-richblack-900 p-3 transition-all duration-200 hover:border-richblack-500"
                      >
                        <label className="flex min-w-fit items-center gap-2 text-sm text-richblack-100">
                          <input
                            type="radio"
                            name={`correct-answer-${questionIndex}`}
                            checked={question.correctOptionIndex === optionIndex}
                            onChange={() =>
                              updateQuestion(questionIndex, "correctOptionIndex", optionIndex)
                            }
                            className="cursor-pointer"
                          />
                          <span className="text-xs uppercase tracking-widest text-richblack-400">
                            Correct
                          </span>
                        </label>

                        <input
                          type="text"
                          value={option}
                          onChange={(event) =>
                            updateOption(questionIndex, optionIndex, event.target.value)
                          }
                          className="flex-1 rounded-md border border-richblack-600 bg-richblack-800 px-3 py-2 text-richblack-25 placeholder-richblack-500 transition-all duration-200 focus:border-yellow-50 focus:outline-none"
                          placeholder={`Option ${optionIndex + 1}`}
                        />

                        {question.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(questionIndex, optionIndex)}
                            className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-300 transition-all duration-200 hover:border-red-400 hover:bg-red-500/20"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addOption(questionIndex)}
                      className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-yellow-50/50 px-4 py-2 text-sm font-medium text-yellow-50 transition-all duration-200 hover:border-yellow-50 hover:bg-yellow-50/5"
                    >
                      <FiPlus className="h-4 w-4" /> Add Option
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addQuestion}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-yellow-50 bg-yellow-50/10 px-4 py-4 text-sm font-semibold text-yellow-50 transition-all duration-200 hover:bg-yellow-50/20"
              >
                <FiPlus className="h-5 w-5" /> Add Question
              </button>
            </div>
          )}

          <div className="mt-10 flex items-center justify-center gap-x-3">
            <button
              type="button"
              className="flex w-fit items-center justify-center gap-x-2 rounded-md border-b-2 border-r-2 border-richblack-700 bg-richblack-600 px-3 py-2 font-bold text-white transition-all duration-250 hover:scale-95 hover:border-black md:px-6 md:py-3"
              onClick={() => {
                dispatch(removeSubsection());
              }}
            >
              <FaChevronCircleLeft />
              Back
            </button>
            <button
              type="submit"
              className="flex w-fit items-center justify-center gap-x-2 rounded-md border-b-2 border-r-2 border-richblack-700 bg-[#FFD60A] px-3 py-2 font-bold text-black transition-all duration-250 hover:scale-95 hover:border-black md:px-6 md:py-3"
            >
              {editSubSection ? "Update" : "Create"}
              <FaChevronCircleRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubSectionForm;
