import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../Header'
import CompanyAdminPanel from './CompanyAdminPanel'
import { useStateContext } from '../../contexts/ContextProvider';

export default function CompanyAdminLayout() {
  const { token, user } = useStateContext();

  if (token) {
    if (user.usertype == "SiteAdmin") {
      return <Navigate to="/site_dashboard" />
    } else if (user.usertype == "StoreAdmin") {
      return <Navigate to="/store_dashboard" />
    } else if (user.usertype == "Customer") {
      return <Navigate to="/dashboard" />
    }
  }

  return (

    <div id="defaultLayout">
      <CompanyAdminPanel />
      <div className='content'>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>


  )
}
