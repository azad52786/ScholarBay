import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import ChangeProfileInformation from './ChangeProfileInformation'
import DeleteProfileSection from './DeleteProfileSection'

const Main = () => {
  return (
    <div  className=' w-full min-h-screen bg-richblack-900 flex flex-col items-center justify-center text-pure-greys-25 p-6'>
      <h1 className="mb-14 mt-8 ml-6 font-bold text-3xl text-richblack-5">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <ChangeProfileInformation/>
      {/* <EditProfile /> */}
      <DeleteProfileSection/>
      {/* Password */}
      {/* <UpdatePassword /> */}
      {/* Delete Account */}
      {/* <DeleteAccount /> */}
    </div>
  )
}

export default Main
