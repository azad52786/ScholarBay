import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../../utils/constants';

const StudentRoute = ({children}) => {
  const { user } = useSelector((store) => store.User);
  return (
        <>
            {
                user?.accountType === ACCOUNT_TYPE.STUDENT ? (<>{children}</>) : (<Navigate to={'/'} />)
            }
        </>
    
  )
}

export default StudentRoute
