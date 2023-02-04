import React, { useState } from 'react'
import { useRef } from 'react';
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);

    const { setUser, setToken, notification, } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        setErrors(null);
        axiosClient.post('/login', payload)
            .then((data) => {
                setUser(data.data.user);
                setToken(data.data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message]
                        })
                    }
                }
            })

    }


    return (
        <div className='login-signup-form aniamated fadeInDown'>
            <div className='form'>
                <form onSubmit={onSubmit}>
                    <h1 className='title'>
                        Login into your account
                    </h1>
                    {errors && <div className='alert'>
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>}
                    <input className='inputLog' ref={emailRef} type="email" placeholder='Email' />
                    <input className='inputLog' ref={passwordRef} type="password" placeholder='Password' />
                    <button className='btn btn-block'>Login</button>
                    <p className='message'>
                        Not Registered? <Link to="/signup">Create an account</Link>
                    </p>
                </form>

            </div>
            {notification &&
                <div className='notification'>
                    {notification}

                </div>
            }

        </div>
    )
}
