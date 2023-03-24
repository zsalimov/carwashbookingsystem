import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axiosClient from '../../axios-client'
import { useStateContext } from '../../contexts/ContextProvider'
import '../../index.css'

export default function UserForm() {
    const { id } = useParams()
    const isMounted = useRef(false)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null);
    const { notification, setNotification } = useStateContext()
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',        
    })

    console.log('user Form', user)
    if (id) {
        useEffect(() => {
            if (!isMounted.current) {
                isMounted.current = true
            } else {
                setLoading(true)
                axiosClient.get(`/users/${id}`)
                    .then(({ data }) => {
                        setLoading(false)
                        setUser(data.data)

                    })
                    .catch(() => {
                        setLoading(false)
                    })
            }
        }, [])
    }
    const onSubmit = (ev) => {
        ev.preventDefault()
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification(`${user.name} was successfully updated!`)
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {

                        setErrors(response.data.errors);
                    }
                })
        } else {
            axiosClient.post(`/users/`, user)
                .then(() => {
                    setNotification("User was successfully created!")
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })
        }

    }

    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}

            {!user.id && <h1>Add New User:</h1>}
            <div className='card animated fadeInDown'>
                {loading && (
                    <div className='text-center'>Loading... </div>
                )}
                {errors &&
                    <div className='alert'>
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading &&
                    <form onSubmit={onSubmit}>
                        <input className='inputLog' value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} placeholder='Name' />
                        <input className='inputLog' type="email" value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })} placeholder='Email' />
                        <input className='inputLog' type="password" onChange={ev => setUser({ ...user, password: ev.target.value })} placeholder='Password' />
                        <input className='inputLog' type="password" onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} placeholder='Password Confirmation' />
                        <button className='btn'>Save</button>
                        &nbsp;
                        <Link to="/users" className='btn-cancel'>Cancel</Link>

                    </form>
                }
            </div>
        </>
    )
}
