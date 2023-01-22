import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login";
import Users from "./views/Users";
import Companies from "./views/Companies";
import Signup from "./views/Signup";
import NotFound404 from "./views/NotFound404";
import DeafaultLayout from "./components/DeafaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./Dashboard";
import UserForm from "./views/UserForm";
import CompanyForm from "./views/CompanyForm";



const router = createBrowserRouter( [
    {
        path:'/',
        element:<DeafaultLayout />,
        children: [
        {
            path:'/',
            element: <Navigate to="/users" />
        },
        {
            path: '/dashboard',
            element: <Dashboard />
        },
        {
            path: '/users',
            element: <Users />
        },
        {
            path: '/companies',
            element: <Companies />
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
            path: '/companies/new',
            element: <CompanyForm key="companyCreate"/>
        },
        {
            path: '/companies/:id',
            element: <CompanyForm key="companyUpdate"/>
        }

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
        path: '*',
        element: <NotFound404 />
    }

]);

export default router;