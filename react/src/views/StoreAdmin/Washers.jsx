import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';
import {Settings} from'@mui/icons-material'


export default function Washers() {
  const [washers, setWashers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();


  useEffect(() => {
    getWashers();
  }, [])


  const getWashers = () => {
    setLoading(true)
    axiosClient.get('/washers')
      .then(({ data }) => {
        setLoading(false)
        setWashers(data)
        console.log('washers', data)

      })
      .catch(() => {
        setLoading(false)
      })
  }
  const onDelete = (w) => {
    if (!window.confirm(`Are you sure you want to delete ${w.wName}?`)) {
      return
    }
    axiosClient.delete(`/washers/${w.wId}`)
      .then(() => {
        setNotification("Washer was successfully deleted!")
        getWashers()
      })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/*inline styling */}
        <h1> Car Wash</h1>
        <Link to="/washers/new" className='btn-add'>Add new</Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <tr>
              <th>Washer ID</th>
              <th>Washer Store Name</th>
              <th>Washer Name</th>
              <th>Washer O/C Pattern ID</th>
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
              {washers.map( w => (
                <tr key={w.wId}>
                  <td>{w.wId}</td>
                  <td>{w.sName}</td>
                  <td>{w.wName}</td>
                  <td>{w.ocpName}</td>
                  <td>                    
                   <Link   to={'/washers/' + w.wId} className='btn-add'><span className='settings'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Settings</Link>
                    &nbsp;
                    <button onClick={ev => onDelete(w)} className="btn-delete">Delete</button>
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
