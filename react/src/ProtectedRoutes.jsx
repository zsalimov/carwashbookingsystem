import {
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate,
  } from 'react-router-dom';
import { ContextProvider } from './contexts/ContextProvider';

export const ProtectedRoutes = ({ children }) => {
    const { token,user } = ContextProvider();

          if (user.usertype == "SiteAdmin") {
              return <Navigate to="/site_dashboard" />
            } else if (user.usertype == "CompanyAdmin") {
              return <Navigate to="/company_dashboard" />
            } else if (user.usertype == "Customer") {
              return <Navigate to="/dashboard" />
            }
      
      
  return (
    <>{children}</>
  )
}




  
    

