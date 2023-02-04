import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login";
import Users from "./views/SiteAdmin/Users";
import Companies from "./views/SiteAdmin/Companies";
import Signup from "./views/Signup";
import NotFound404 from "./views/NotFound404";

import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Customer/Dashboard";
import UserForm from "./views/SiteAdmin/UserForm";
import CompanyForm from "./views/SiteAdmin/CompanyForm";
import SiteAdminLayout from "./components/SiteAdmin/SiteAdminLayout";
import SiteDashboard from "./views/SiteAdmin/SiteDashboard";
import CompanyAdminLayout from "./components/CompanyAdmin/CompanyAdminLayout";
import CompanyDashboard from "./views/CompanyAdmin/CompanyDashboard";
import CompanyUsers from "./views/CompanyAdmin/CompanyUsers";
import StoreAdminLayout from "./components/StoreAdmin/StoreAdminLayout";
import StoreDashboard from "./views/StoreAdmin/StoreDashboard";
import Washers from "./views/StoreAdmin/Washers";
import CustomerLayout from "./components/Customer/CustomerLayout";
import Reservations from "./views/Customer/Reservations";
import Stores from "./views/CompanyAdmin/Stores";
import StoreForm from "./views/CompanyAdmin/StoreForm";
import WasherForm from "./views/StoreAdmin/WasherForm";




const router = createBrowserRouter( [
    {
       
        path:'/',
        element:<SiteAdminLayout />,
        children: [
        // {
        //     path:'/',
        //     element: <Navigate to="/site_dashboard" />
        // },
        {
            path: '/site_dashboard',
            element: <SiteDashboard />
        },
        {
            path: '/users',
            element: <Users />
        },
        
        {
            path: '/users/new',
            element: <UserForm key="userCreate"/>
        },
        {
            path: '/users/:id',
            element: <UserForm key="userUpdate"/>
        },        
        {
            path: '/companies',
            element: <Companies />
        },
        {
            path: '/companies/new',
            element: <CompanyForm key="companyCreate"/>
        },
        {
            path: '/companies/:id',
            element: <CompanyForm key="companyUpdate"/>
        },        

        ]
    },
    
    {
        path:'/',
        element:<GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },
    {
        path:'/',
        element:<CompanyAdminLayout />,
        children: [
            {
                path: '/company_dashboard',
                element: <CompanyDashboard />
            },
            {
                path: '/stores',
                element: <Stores />
            },
            {
                path: '/company_users',
                element: <CompanyUsers />
            },
            {
                path: '/stores/:id',
                element: <StoreForm key="storeUpdate"/>
            },
            {
                path: '/stores/new',
                element: <StoreForm key="storeCreate"/>
            },    
        ]
    },
    {
        path:'/',
        element:<StoreAdminLayout />,
        children: [
            {
                path: '/store_dashboard',
                element: <StoreDashboard />
            },
            {
                path: '/washers',
                element: <Washers />
            },
            {
                path: '/washers/:id',
                element: <WasherForm key="washerUpdate"/>
            },
        ]
    },
    {
        path:'/',
        element:<CustomerLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/reservations',
                element: <Reservations />
            }
        ]
    },
    
    
    {
        path: '*',
        element: <NotFound404 />
    }

]);


export default router;

