import React from 'react'
import { Link } from 'react-router-dom'

const BackToLogin = () => {
  return (
    <Link to='/login'><div className=" text-pure-greys-5 cursor-pointer" > ⬅️ Back to login</div></Link>
  )
}

export default BackToLogin