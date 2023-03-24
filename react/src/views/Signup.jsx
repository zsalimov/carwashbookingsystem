import { Grid } from '@mui/material';
import { useState } from 'react';
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import CryptoJS from "crypto-js"


export default function Signup() {
    const navigate = useNavigate();
    const nameRef = useRef();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();
    

    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,         
        }

        axiosClient.post('/signup', payload)
            .then((data) => {
                setUser(data.user)
                setToken(data.token)
                navigate('/login');
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {

                    setErrors(response.data.errors);
                }
            })

    }
    return (
        <div style={{ display: 'flex' }}>
            <Grid className="signupleft"
                item
                xs={false}
                sm={4}
                md={7}
                sx={{

                    backgroundImage: `url(../../src/assets/img/car2.jpg)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div className='login-signup-form aniamated fadeInDown'>
                <div className='form'>
                    <form onSubmit={onSubmit}>
                        <h1 className='title'>
                            Signup for free
                        </h1>
                        {errors && <div className='alert'>
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>}
                        <input className='inputLog' ref={nameRef} placeholder='Full Name' />
                        <input className='inputLog' ref={emailRef} type="email" placeholder='Email Address' />
                        <input className='inputLog' ref={passwordRef} type="password" placeholder='Password' />
                        <input className='inputLog' ref={passwordConfirmationRef} type="password" placeholder='Password Confirmation' />
                        <button className='btn btn-block'>Signup</button>
                        <p className='message'>
                            Already Registered? <Link to="/login">Login</Link>
                        </p>
                    </form>
                    <div className='copy'> {'Copyright © '}{new Date().getFullYear()} </div>
                </div>
            </div>
        </div>
    )

}
