import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider';
import Header from '../Header'
import SiteAdminPanel from './SiteAdminPanel'

export default function SiteAdminLayout() {
  const { token, user } = useStateContext({});

  if (token) {
    if (user.usertype === "StoreAdmin") {
      return <Navigate to="/store_dashboard" />
    } else if (user.usertype === "CompanyAdmin") {
      return <Navigate to="/company_dashboard" />
    } else if (user.usertype === "Customer") {
      return <Navigate to="/dashboard" />
    }
  }

  return (
    <>
      <Header />
      <div className='mainContainer'>
        <SiteAdminPanel />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  )
}
