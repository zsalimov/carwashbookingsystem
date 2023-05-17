import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import UserForm from '../SiteAdmin/UserForm'

export default function Profile() {
    const { user, token, users, url, setNotification, setUrl, setUser, setToken } = useStateContext()
  
    return (
        <div>
            <h1>Profile</h1>
            <div className='myvehicles'>
                <img src={url} className='profileImage' />
                <div className="cartext">{user.name}</div>
                
            </div>
            <UserForm />

        </div>
    )
}
