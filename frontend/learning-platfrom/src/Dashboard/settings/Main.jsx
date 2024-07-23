import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import ChangeProfileInformation from './ChangeProfileInformation'
import DeleteProfileSection from './DeleteProfileSection'
import FileDetails from '../FileDetails'
import { useLocation } from 'react-router-dom'

const Main = () => {
  const { pathname } = useLocation();
  return (
    <div  className=' w-full bg-richblack-900 flex flex-col items-center justify-center text-pure-greys-25 '>
    <FileDetails pathname={pathname} extra={["Edit Profile"]}/>
      <h1 className="mb-14 mt-5 ml-7 font-bold text-start w-full text-3xl text-richblack-5">
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
