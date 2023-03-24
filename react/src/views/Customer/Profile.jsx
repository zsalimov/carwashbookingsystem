import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider'

export default function Profile() {
    const { user, token, users, url, setNotification, setUrl, setUser, setToken } = useStateContext()
  
    return (
        <div>
            <h1>Profile</h1>
            <div className='myvehicles'>
                <img src={url} className='profileImage' />
                <div className="cartext">{user.name}</div>
            </div>

        </div>
    )
}
