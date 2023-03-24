import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../Header'
import CustomerPanel from './CustomerPanel'
import { useStateContext } from '../../contexts/ContextProvider';


export default function CustomerLayout() {
  const { token, user } = useStateContext();

  if (token) {
    if (user.usertype == "SiteAdmin") {
      return <Navigate to="/site_dashboard" />
    } else if (user.usertype == "CompanyAdmin") {
      return <Navigate to="/company_dashboard" />
    } else if (user.usertype == "StoreAdmin") {
      return <Navigate to="/store_dashboard" />
    }
  }

  return (
    <>
      <Header />
      <div className="mainContainer">
        <CustomerPanel />
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </>
  )
}
