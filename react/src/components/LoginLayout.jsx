import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import CompanyAdminPanel from './CompanyAdmin/CompanyAdminPanel';
import CustomerPanel from './Customer/CustomerPanel';
import Header from './Header'
import SiteAdminPanel from './SiteAdmin/SiteAdminPanel';
import StoreAdminPanel from './StoreAdmin/StoreAdminPanel';

export default function LoginLayout() {
  const { token, user } = useStateContext({});
  
    
  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Header />
      <div className='mainContainer'>
        {user.usertype == "SiteAdmin" && <SiteAdminPanel /> }
        {user.usertype == "CompanyAdmin" && <CompanyAdminPanel /> }
        {user.usertype == "StoreAdmin" && <StoreAdminPanel /> }
        {user.usertype == "Customer" && <CustomerPanel /> }
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  )
}
