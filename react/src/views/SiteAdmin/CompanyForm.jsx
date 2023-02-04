import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axiosClient from '../../axios-client'
import { useStateContext } from '../../contexts/ContextProvider'
import Select from 'react-select';

export default function CompanyForm() {
    const { id } = useParams(null)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(0);
    const [options, setOptions] = useState("");
    const { user, setNotification, setErrorMessage } = useStateContext()
    const [company, setCompany] = useState({
        id: null,
        name: ''
    })
    
    // const [user, setUser] = useState({
    //     id: null
    // })



    if (id) {
        useEffect(() => {
            getUsers()
            setLoading(true)
            axiosClient.get(`/companies/${id}`)
                .then(({ data }) => {
                    console.log('data', data)
                    setLoading(false)
                    setCompany(data)
                   
                })
                .catch(() => {
                    setLoading(false)
                })

        }, [])
    }
    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false)
                setUsers(data.data)
                
                const userOptions = data.data.map(function (u) {

                    return {
                        value: u.id,
                        label: u.name
                    };
                });
                setOptions(userOptions);

            })
            .catch(() => {
                setLoading(false)
            })
    }

    const onSubmit = (ev) => {
        ev.preventDefault()

        if (company.cId) {
            axiosClient.put(`/companies/${company.cId}`, company)
                .then(() => {
                    setNotification("Company was successfully updated!")
                    navigate('/companies')

                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {

                        setErrors(response.data.errors);
                    }
                })
        } else {
            axiosClient.post(`/companies`, company)
                .then(({ data }) => {
                    if (data.color == 'red') { setErrorMessage(data.description) }
                    else {
                        setNotification(data.description)
                    }

                    if (data.code > 0) {
                        navigate('/companies')
                    }

                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })
        }

    }

    var onAssign = (ev) => {
        ev.preventDefault()

        if (company.cId && userId) {
            axiosClient.put(`/companies/${company.cId}|${userId}`)
                .then(() => {
                    setNotification("Admin was successfully assigned!")
                    navigate('/companies')
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
            {company.cId && <h1>Update Company: {company.cName}</h1>}

            {!company.cId && <h1>Add New Company:</h1>}
            <div className='card animated fadeInDown'>
                {loading && (

                    <div className='text-center'>  Loading...  <progress value={null} /></div>
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

                        <input className='inputLog' value={company.cName} onChange={ev => setCompany({ ...company, cName: ev.target.value })} placeholder='Name' />

                        <button className='btn'>Save</button>
                        &nbsp;
                        <Link to="/companies" className='btn-cancel'>Cancel</Link>

                    </form>
                }
                <br />

                {!loading &&
                    <form onSubmit={onAssign}>
                        <label><h1> Assign admin to a company</h1></label>

                        <Select id='inputLog' options={options} onChange={(ev) => { setUserId(ev.value) }} />

                        <button className='btn'>Assign</button>
                    </form>
                }
            </div>
        </>
    )
}
