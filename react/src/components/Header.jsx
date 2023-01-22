import React, { useEffect } from 'react'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
import {Link, Navigate} from 'react-router-dom'



export default function () {
    const {user, token,notification, setUser, setToken} = useStateContext()

    if (!token) {
        return <Navigate to ="/login" />
    }

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')

        .then(() => {
            setUser({})
            setToken(null)
        })
    }

   

    useEffect(() => {
       
        
        axiosClient.get('/user')
        .then(({data})=>{
            setUser(data)
        })
    }, [] )
  return (
    <header>
                <div>
            <Link className ="btn-logout" to="/dashboard">Dashboard</Link>
            <Link className ="btn-logout" to="/users">Users</Link>  
            <Link className ="btn-logout" to="/companies">Companies</Link>  
                    
                </div>     
                    
                
                <div>
                    {user.name}
                    <a href="#" onClick={onLogout} className='btn-logout'>Logout</a>
                    {notification && 
                        <div className='notification'>
                            {notification}
                        </div>
                        
                    }              
                      
                </div>
              
    </header>
)}

