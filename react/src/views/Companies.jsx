import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';

import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext();

  
  useEffect(() => {
    getCompanies();
    
  }, [])
  
  const onDelete = (c) => {
    if (!window.confirm(`Are you sure you want to delete ${c.cName}?`)) {       
      return
    }
             
    axiosClient.delete(`/companies/${c.cId}`)    
      .then(()=> {
        setNotification("Company was successfully deleted!")
        
        getCompanies()
      })
  }
  const getCompanies = () => {
    setLoading(true)
    axiosClient.get('/companies')
    .then(({data}) => {
      setLoading(false)
      setCompanies(data)
      
    })
    .catch(() => {
      setLoading(false)
    })
  }
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h1> Companies </h1>
        <Link to="/companies/new" className='btn-add'>Add new</Link>
      </div>
      <div className='card animated fadeInDown'>
          <table>
            <thead>
              <tr>
                <th>Company ID</th>
                <th>Company Name</th>                
                <th>Actions</th>
              </tr>
            </thead>
            {loading && 
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center">
                  Loading...
                  </td>
                </tr>
              </tbody>
            }
            {!loading &&
              <tbody>              
                {companies.map( c => (  
                                      
                  <tr key={c.cId}>
                    <td>{c.cId}</td>
                    <td>{c.cName}</td>
                    <td>
                      <Link className="btn-edit" to={'/companies/'+c.cId}>Edit</Link>
                      &nbsp;
                      <button onClick={ev => onDelete(c)} className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            }
          </table>
      </div>
    </div>
  )
}
