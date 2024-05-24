export const BASE_URL = process.env.REACT_APP_BASE_URL

export const AUTH_API = {
    SEND_RESET_TOKEN : `${BASE_URL + '/auth/reset-password-token'}` , 
    RESET_PASSWORD :  `${BASE_URL + '/auth/reset-password'}` , 
    SEND_OTP : `${BASE_URL + '/auth/sendotp'}` , 
    SIGN_UP : `${BASE_URL + '/auth/signup'}` , 
    LOG_IN : `${BASE_URL + '/auth/login'}` , 
}

export const PROFILE_API = {
    GET_USER_DATA : `${BASE_URL + '/profile/getUserDetails'}`
}

export const COURSE_API = {
    GET_ALL_TAGS : `${BASE_URL + '/course/showAllTags'}`
}

export const SEND_MAIL = {
    CONTACT_US_SEND_MAIL : `${BASE_URL + '/mail/sendMailForContactUs'}`,
}