import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {token} = useSelector((store) => store.Auth)
  return (
    <>
      {
        token ? (children) : (<Navigate to={'/login'}/>)
      }
    </>
  )
}

export default ProtectedRoute
