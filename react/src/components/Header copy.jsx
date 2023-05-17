import React, { useEffect } from 'react'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
import { Navigate } from 'react-router-dom'
import {  faBusinessTime, faCar, faCloudShowersWater, faPerson, faPhone, faSignOut,} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/header.css'
import '../../src/index.css'

export default function () {

    const { user, token, notification, setNotification, setUser, setToken } = useStateContext()
     console.log('Header', user)
    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')

            .then(() => {
                setUser({})
                setToken(null)
                setNotification('Logout was successfull!')
                

            })
    }


    //var callcount = 0;
    useEffect(() => {
        // if (++callcount>1) {
        //     return;
        // }
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)

            })
    }, [])
    return (
        <div className='header'>
            <div className="headerContainer">
                <div className="headerList">
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCloudShowersWater} />
                        <span>Car Wash Bookings</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBusinessTime} />
                        <span>Opening Hours</span>
                    </div>
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Supported Vechicle Types</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPhone} />
                        <span>Contact us</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPerson} />
                        <span>{user.name}({user.usertype})</span>

                        <span><div className='headerListItem'>                        
                            <a href="#" onClick={onLogout} className="btn-logout"><FontAwesomeIcon icon={faSignOut} />Logout</a>
                            </div>
                            </span>
                    </div>
                </div>

                <h1>Welcome to the Car Wash Reservation System. 
                        Developed software to meet the needs of the car wash industry.</h1>

                <label htmlFor='search'>Search:</label>
                <input id='search' type='text' />

            </div>




        </div>
    )
}

