import React from 'react'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { Navigate } from 'react-router-dom'

const InstructorRoute = ({children}) => {
    const { user } = useSelector((store) => store.User);
    console.log(user.accountType)
  return (
        <>
            {
                user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? (<>{children}</>) : (<Navigate to={'/'} />)
            }
        </>
    
  )
}

export default InstructorRoute
