import React from 'react'
import Sidebar from '../Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

const DashBoard = () => {
  return (
    <div className=' min-h-screen relative w-screen bg-richblack-900 flex'>
        
      {/* sidebar */}
      <Sidebar/>
      {/* outlet */}
      <Outlet/>
    </div>
  )
}

export default DashBoard
