import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const OpenRoute = ({children}) => {
    const {token} = useSelector((store) => store.Auth);

    return token === null ? (children) : (<Navigate to='/'/>)
}

export default OpenRoute