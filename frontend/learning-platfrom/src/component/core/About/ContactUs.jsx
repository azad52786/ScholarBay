import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'

const ContactUs = () => {
  return (
    <div className=' w-full bg-richblack-900 text-start mb-40'>
        <div className=' w-4/12 mx-auto '>
            <h1 className=' text-pure-greys-5 text-4xl font-semibold mb-2 text-center'>Get in Touch</h1>
            <p className=' text-pure-greys-200 mb-10 text-center'>We'd love to here for you, Please fill out this form.</p>
            <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactUs