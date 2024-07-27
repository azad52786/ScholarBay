export const BASE_URL = process.env.REACT_APP_BASE_URL

export const AUTH_API = {
    SEND_RESET_TOKEN : `${BASE_URL + '/auth/reset-password-token'}` , 
    RESET_PASSWORD :  `${BASE_URL + '/auth/reset-password'}` , 
    SEND_OTP : `${BASE_URL + '/auth/sendotp'}` , 
    SIGN_UP : `${BASE_URL + '/auth/signup'}` , 
    LOG_IN : `${BASE_URL + '/auth/login'}` , 
}

export const PROFILE_API = {
    GET_USER_DATA : `${BASE_URL + '/profile/getUserDetails'}` , 
    UPDATE_USER_PROFILE : `${BASE_URL + '/profile/updateDisplayPicture'}` , 
    UPDATE_USER_PROFILE_ADDITIONAL_DATA : `${BASE_URL + '/profile/updateProfile'}` , 
    DELETE_USER : `${BASE_URL + '/profile/deleteProfile/'}` , 
}

export const COURSE_API = {
    GET_ALL_TAGS : `${BASE_URL + '/course/showAllTags'}` , 
    GET_ALL_USER_ENROLLED_COURSE : `${BASE_URL + '/profile/getEnrolledCourses'}` , 
    CREATE_COURSE : `${BASE_URL + '/course/createCourse'}` ,
    UPDATE_COURSE : `${BASE_URL + '/course/updateCourse'}` , 
    CREATE_SECTION : `${BASE_URL + '/course/addSection'}` , 
    DELETE_SECTION : `${BASE_URL + '/course/deleteSection/'}`
}

export const SEND_MAIL = {
    CONTACT_US_SEND_MAIL : `${BASE_URL + '/mail/sendMailForContactUs'}`,
}