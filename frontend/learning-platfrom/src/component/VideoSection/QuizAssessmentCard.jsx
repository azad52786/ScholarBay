import React, { useState } from "react";

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

export default QuizAssessmentCard;
