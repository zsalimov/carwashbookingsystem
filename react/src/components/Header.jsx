import React, { useEffect, useRef, useState } from 'react'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
import { Navigate } from 'react-router-dom'
import '../../src/index.css'
import './header.css'
import { Search, Person, Notifications } from '@mui/icons-material';



export default function Header() { 
   
    const { user, token, url, setNotification, setUrl, setUser, setToken } = useStateContext()

    
    
    if (!token) {
        return <Navigate to="/login" />
    } 
    
    const isMounted = useRef(false) 
    
    
    const onLogout = (ev) => {
                ev.preventDefault()

        axiosClient.post('/logout')

            .then(() => {
                setUser({})
                setToken(null)
                setNotification('Logout was successfull!')
            })
    }

    
    useEffect(() => {      
            
        const fetchUser = async () => { 
            
        const res = await axiosClient.get('/user')                       
                setUser(res.data) 

                if (res.data.imageUrl !== null ) {
                    setUrl(res.data.imageUrl)
                }else{
                    setUrl( '../src/assets/img/default.png')
                }
            }
            console.log('1',isMounted.current)
            if (!isMounted.current) {
                isMounted.current = true
            }else {
            fetchUser()         
        }
    }, [])
    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <span className='logo'> CWBS</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className='searchIcon'/>
                    <input  className ='searchInput' placeholder='Search'/>                    
                </div>                 
            </div>
                <div className="topbarRight">
                    <div className="topbarLinks">
                        <span className="topbarLink">Homepage</span>
                    </div>
                    <div className="topbarIcons">
                        <div className="topbarIconItem">
                            <Person />
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem">
                            <Notifications />
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <img src={url} alt="" className="topbarImage" />
                        <span>{user.name}({user.usertype})
                       
                        </span>
                        
                        <span>
                            <a href="#" onClick={onLogout} className="btn-logout"> | Logout</a>

                        </span>                        
                       
                    </div>
                   
                </div>
                
                
            
        </div>
    )
    
}

