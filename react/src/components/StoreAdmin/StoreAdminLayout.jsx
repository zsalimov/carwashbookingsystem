import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../Header'
import StoreAdminPanel from './StoreAdminPanel'
import { useStateContext } from '../../contexts/ContextProvider';

export default function StoreAdminLayout() {
  const { token, user } = useStateContext();

  if (user.usertype == "SiteAdmin") {
    return <Navigate to="/site_dashboard" />
  } else if (user.usertype == "CompanyAdmin") {
    return <Navigate to="/company_dashboard" />
  } else if (user.usertype == "Customer") {
    return <Navigate to="/dashboard" />
  }

  return (
    <>
      <Header />
      <div className='mainContainer'>
        <StoreAdminPanel />
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </>


  )
}
