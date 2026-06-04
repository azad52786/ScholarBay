import React from "react";
import { Link } from "react-router-dom";

const SimilarCoursesSection = ({ baseCourse, similarCourses = [] }) => {
    const basePrice = Number(baseCourse?.price || 0);

    if (!similarCourses.length) {
        return (
            <div className="mt-12 rounded-2xl border border-richblack-700 bg-richblack-800/80 p-6 text-richblack-25 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                <p className="text-xl font-semibold text-richblack-5">Similar Courses</p>
                <p className="mt-2 text-sm text-richblack-300">
                    No matching alternatives were found for this topic yet.
                </p>
            </div>
        );
    }

    return (
        <section className="mt-12 rounded-3xl border border-richblack-700 bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-yellow-100">Course Comparison</p>
                    <h2 className="mt-2 text-2xl font-semibold text-richblack-5 md:text-3xl">
                        Similar Courses from different instructors
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-richblack-300 md:text-base">
                        These alternatives share the same topic or tag. Use the price and instructor badges to compare similar content across different instructors.
                    </p>
                </div>
                <div className="rounded-2xl border border-richblack-600 bg-richblack-700 px-4 py-3 text-sm text-richblack-100">
                    Base price: <span className="font-semibold text-yellow-50">₹{basePrice}</span>
                </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {similarCourses.map((course) => {
                    const instructorName = `${course?.instructor?.firstName || "Unknown"} ${course?.instructor?.lastName || "Instructor"}`.trim();
                    const priceDifference = Number(course?.price || 0) - basePrice;
                    const relationshipLabel = course?.isSameInstructor
                        ? "Same instructor"
                        : course?.isSameTag
                            ? "Same topic"
                            : "Related course";

                    return (
                        <Link
                            to={`/course/${course?._id}`}
                            key={course?._id}
                            className="group overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800/90 transition-transform duration-300 hover:-translate-y-1 hover:border-yellow-50/50"
                        >
                            <div className="relative h-44 overflow-hidden">
                                <img
                                    src={course?.thumbnail}
                                    alt={course?.courseName}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-richblack-950 via-transparent to-transparent" />
                                <div className="absolute left-4 top-4 rounded-full bg-richblack-950/80 px-3 py-1 text-xs font-semibold text-yellow-100 backdrop-blur">
                                    {relationshipLabel}
                                </div>
                            </div>

                            <div className="space-y-4 p-5">
                                <div>
                                    <h3 className="line-clamp-2 text-lg font-semibold text-richblack-5">
                                        {course?.courseName}
                                    </h3>
                                    <p className="mt-2 text-sm text-richblack-300">
                                        by <span className="text-caribbeangreen-200">{instructorName}</span>
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 text-xs">
                                    {course?.isSameInstructor ? (
                                        <span className="rounded-full border border-blue-300/40 bg-blue-300/10 px-3 py-1 text-blue-100">
                                            Same instructor content
                                        </span>
                                    ) : (
                                        <span className="rounded-full border border-yellow-300/40 bg-yellow-300/10 px-3 py-1 text-yellow-100">
                                            Different instructor rate
                                        </span>
                                    )}
                                    {course?.isSameTag && (
                                        <span className="rounded-full border border-caribbeangreen-300/40 bg-caribbeangreen-300/10 px-3 py-1 text-caribbeangreen-100">
                                            Same topic/tag
                                        </span>
                                    )}
                                    {course?.sharedCategories?.map((category) => (
                                        <span
                                            key={`${course?._id}-${category}`}
                                            className="rounded-full border border-richblack-500 bg-richblack-700 px-3 py-1 text-richblack-100"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-end justify-between border-t border-richblack-700 pt-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.24em] text-richblack-400">Course price</p>
                                        <p className="text-2xl font-semibold text-richblack-5">₹{course?.price}</p>
                                    </div>
                                    <div className="text-right text-sm text-richblack-300">
                                        <p className={priceDifference >= 0 ? "text-red-200" : "text-caribbeangreen-200"}>
                                            {priceDifference === 0
                                                ? "Same price as base course"
                                                : `${priceDifference > 0 ? "+" : ""}₹${Math.abs(priceDifference)} vs base course`}
                                        </p>
                                        <p className="mt-1">Tap to compare details</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default SimilarCoursesSection;
