import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider'

export default function GuestLayout() {
  const { token, user } = useStateContext();

  if (token) {
    if (user.usertype == "SiteAdmin") {
      return <Navigate to="/site_dashboard" />
    } else if (user.usertype == "CompanyAdmin") {
      return <Navigate to="/company_dashboard" />
    } else if (user.usertype == "StoreAdmin") {
      return <Navigate to="/store_dashboard" />
    } else {
      return <Navigate to="/dashboard" />
    }
  }

  return (    
      <div>
        <Outlet />
      </div>    
  )
}
