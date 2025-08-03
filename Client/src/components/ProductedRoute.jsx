import React, { useContext } from 'react'
import { Navigate , useLocation } from 'react-router-dom'
import { authencationContext } from '../App'

const ProtectedRoute = ({children}) => {
 const{isAuthenticated} = useContext(authencationContext)
  return (isAuthenticated ? children : <Navigate to="/login" state={{from : location.pathname}} replace />)
}
export default ProtectedRoute
