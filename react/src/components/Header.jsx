import React, { useEffect, useRef, useState } from 'react'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
import { Navigate, useNavigate } from 'react-router-dom'
import '../../src/index.css'
import './header.css'
import { Search, Person, Notifications, LockClock, Settings, Logout } from '@mui/icons-material';
import SearchBar from './SearchBar'
import { add, format } from 'date-fns';
import Dropdown from './Dropdown'



export default function Header() {

    const { user, token, users, url, setNotification, setUrl, setUser, setToken } = useStateContext()

    if (!token) {
        return <Navigate to="/login" />
    }

    // no variable can be defined before if statement
    const isMounted = useRef(false)
    const [now, setNow] = useState(new Date())
    const navigate = useNavigate();

    useEffect(() => {
        setInterval(() => setNow(new Date()), 1000);
    }, []);

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

        fetchUser()
    }, [])
    const fetchUser = async () => {

        const res = await axiosClient.get('/user')
        setUser(res.data)

        if (res.data.imageUrl !== null) {
            setUrl(res.data.imageUrl)            // set user image URL
        } else {
            setUrl('../src/assets/img/default.png')   // if there is no image default one is provided
        }
    }

    const handleMenuOne = () => {        
        if (token)
            navigate('/profile')
    };

    const handleMenuTwo = () => {


    };
    const handleMenuThree = () => {

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
                setNotification('Logout was successfull!')
            })
    };

    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <span className='logo'>CWBS</span>
            </div>
            < SearchBar />
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">{format(now, 'EEE kk:mm:ss')}</span>
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
                    <span> {user.name}({user.usertype}) </span>
                    <Dropdown
                        trigger={
                            <img src={url} alt="user image" className="topbarImage" />}
                        menu={[<button className='topbarIcons' onClick={handleMenuOne}><Person />My profile</button>,
                        <button className='topbarIcons' onClick={handleMenuTwo}> <Settings /> Settings</button>,
                        <button className='topbarIcons' onClick={handleMenuThree}> <Logout /> Logout</button>,
                        ]}
                    />                  
                </div>
            </div>
        </div>
    )
}