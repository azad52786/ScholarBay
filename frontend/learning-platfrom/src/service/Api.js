export const BASE_URL = process.env.REACT_APP_BASE_URL

export const AUTH_API = {
    SEND_RESET_TOKEN: `${BASE_URL + '/auth/reset-password-token'}`,
    RESET_PASSWORD: `${BASE_URL + '/auth/reset-password'}`,
    SEND_OTP: `${BASE_URL + '/auth/sendotp'}`,
    SIGN_UP: `${BASE_URL + '/auth/signup'}`,
    LOG_IN: `${BASE_URL + '/auth/login'}`,
}

export const PROFILE_API = {
    GET_USER_DATA: `${BASE_URL + '/profile/getUserDetails'}`,
    UPDATE_USER_PROFILE: `${BASE_URL + '/profile/updateDisplayPicture'}`,
    UPDATE_USER_PROFILE_ADDITIONAL_DATA: `${BASE_URL + '/profile/updateProfile'}`,
    DELETE_USER: `${BASE_URL + '/profile/deleteProfile'}`,
}

export const COURSE_API = {
    GET_ALL_TAGS: `${BASE_URL + '/course/showAllTags'}`,
    GET_ALL_USER_ENROLLED_COURSE: `${BASE_URL + '/profile/getEnrolledCourses'}`,
    CREATE_COURSE: `${BASE_URL + '/course/createCourse'}`,
    UPDATE_COURSE: `${BASE_URL + '/course/updateCourse'}`,
    CREATE_SECTION: `${BASE_URL + '/course/addSection'}`,
    DELETE_SECTION: `${BASE_URL + '/course/deleteSection/'}`,
    UPDATE_SECTION: `${BASE_URL + '/course/updateSection'}`,
    CREATE_SUBSECTION: `${BASE_URL + '/course/addSubSection'}`,
    UPDATE_SUBSECTION: `${BASE_URL + '/course/updateSubSection'}`,
    DELETE_SUBSECTION: `${BASE_URL + '/course/deleteSubSection'}`,
    UPDATE_MODE: `${BASE_URL + '/course/changeMode'}`,
    COURSE_DETAILS: `${BASE_URL + '/course/getCourseDetails'}`,
    SIMILAR_COURSES: `${BASE_URL + '/course/similar'}`,
    ENROLLED_COURSE_DETAILS: `${BASE_URL + '/course/getErolledCourse'}`,
    ADD_RATING: `${BASE_URL + '/course/createRating'}`,
    MARKED_SUBSECTION: `${BASE_URL + '/course/markWatched'}`,
    GET_ALL_RATINGS_AND_REVIEW: `${BASE_URL + '/course/getReviews'}`,
    GET_PROGRESS: `${BASE_URL + '/course/getCourseProgress'}`
}

export const CERTIFICATE_API = {
    CHECK_ELIGIBILITY: `${BASE_URL + '/course/certificates/check-eligibility'}`,
    GET_CERTIFICATE: `${BASE_URL + '/course/certificates/get-certificate'}`,
    GENERATE: `${BASE_URL + '/course/certificates/generate'}`,
    DOWNLOAD: `${BASE_URL + '/course/certificates/download'}`,
    SEND_EMAIL: `${BASE_URL + '/course/certificates/send-email'}`,
    PUBLISH: `${BASE_URL + '/course/publishCertificate'}`,
    UNPUBLISH: `${BASE_URL + '/course/unpublishCertificate'}`,
    GET_STATUS: `${BASE_URL + '/course/getCertificateStatus'}`,
}

export const PROGRESS_API = {
    MARK_COMPLETE: `${BASE_URL + '/course/progress/mark-complete'}`,
    MARK_INCOMPLETE: `${BASE_URL + '/course/progress/mark-incomplete'}`,
    GET_PROGRESS: `${BASE_URL + '/course/progress/get-progress'}`,
    GET_COMPLETED_LESSONS: `${BASE_URL + '/course/progress/get-completed-lessons'}`,
}


export const INSTRUCTOR_DASHBOARD_API = {
    GET_INSTRUCTOR_COURSES: `${BASE_URL + "/course/getInstructorCourses"}`,
    GET_INSTRUCTOR_DASHBOARD_DETAILS: `${BASE_URL + '/profile/instructorDashBoardDetails'}`
}

export const CATAGORY_APIS = {
    CATAGORY_PAGE_DETAILS: `${BASE_URL + '/course/getCategoryPageDetails'}`
}

export const SEND_MAIL = {
    CONTACT_US_SEND_MAIL: `${BASE_URL + '/mail/sendMailForContactUs'}`,
}

export const PAYMENT_API = {
    PAYMENT_CAPTURE: `${BASE_URL + '/payment/capturePayment'}`,
    SUCCESSFUL_PAYMENT_MAIL: `${BASE_URL + '/payment/sendPaymentSuccessEmail'}`,
    VERIFY_PAYMENT: `${BASE_URL + '/payment/verifySignature'}`,
}
