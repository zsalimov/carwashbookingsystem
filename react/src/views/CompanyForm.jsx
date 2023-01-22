import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

export default function CompanyForm() {
    const {id} = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null);
    const {setNotification, setErrorMessage} = useStateContext()
    const [company, setCompany] = useState({
        id:null,
        name:''       
    })

   

    if (id) {       
        useEffect(() => {
           
            setLoading(true)
            axiosClient.get(`/companies/${id}`)
                .then(({data}) => {                    
                    setLoading(false)
                    setCompany(data)
                   
                })
                .catch(() => {
                    setLoading(false)
                })
                
        },[])
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
                axiosClient.post(`/companies`,company)
                    .then(({data}) => { 
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

  return (
    <>
        {company.cId && <h1>Update Company: {company.cName}</h1>}
         
        {!company.cId && <h1>Add New Company:</h1>}
        <div className='card animated fadeInDown'>
            {loading && (
                <div className='text-center'>Loading... </div>
            )}
            {errors && 
                <div className='alert'>
                    {Object.keys(errors).map(key=> (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }
            {!loading && 
                <form onSubmit={onSubmit}>
                    
                    <input              value={company.cName} onChange={ev => setCompany({...company, cName:ev.target.value})} placeholder='Name'/>
                    
                <button className='btn'>Save</button>
                </form>
            }
        </div>
    </>
  )
}
