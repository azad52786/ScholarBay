import React from "react";
import ReactMarkdown from "react-markdown";

const ReadingPane = ({ lesson }) => {
  const markdownContent = lesson?.markdownContent || lesson?.description || "";

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
          <ReactMarkdown
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
              code: ({ children }) => (
                <code className="rounded bg-richblack-900 px-1.5 py-0.5 text-sm text-caribbeangreen-200">
                  {children}
                </code>
              ),
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
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ReadingPane;
