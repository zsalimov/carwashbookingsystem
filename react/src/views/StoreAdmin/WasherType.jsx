import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Select from 'react-select';
import axiosClient from '../../axios-client'
import TableText from '../../components/helper/TableText';
import { useStateContext } from '../../contexts/ContextProvider'

export default function WasherType() {
  const { id } = useParams(1)
  const [options, setOptions] = useState("");
  const [loading, setLoading] = useState(false)
  const [washers, setWashers] = useState([])
  const [washerId, setWasherId] = useState([])  
  const { setNotification } = useStateContext()
  

  useEffect(() => {
    fetchWashers();
    getUnusedWasherType()
  }, [])

  const fetchWashers = async () => {
    setLoading(true)
    const res = await axiosClient.get(`/washer_type/${id}`)
    setWashers(res.data)
    console.log(res.data)
    setLoading(false)
  }

  const onDelete = (w) => {
    if (!window.confirm(`Are you sure you want to delete ${w.wtDescription}?`)) {
      return
    }
    const payload = {
      wId: id,
      wtId: w.wtId
    }
    axiosClient.post(`/washer_type`, payload)
      .then(() => {
        setNotification("WasherType was successfully deleted!")
        fetchWashers()
        getUnusedWasherType()
      })
  }

  const getUnusedWasherType = () => {
    setLoading(true)
    axiosClient.post(`/washer_type/${id}`)
      .then(({ data }) => {
        setLoading(false)         
        const washersTypeOptions = data.map(function (v) {
          return {
            value: v.wtId,
            label: v.wtDescription
          };
        });
        setOptions(washersTypeOptions);
      })
      .catch(() => {
        setLoading(false)
      })
  }

  var onAssign = (ev) => {
    ev.preventDefault()
    const payload = {
      wwtWasherId: id,
      wwtWasherTypeId: washerId,     
    }
    axiosClient.post(`/add_washers`, payload)
      .then(() => {
        setNotification("WasherType was successfully assigned!")
        fetchWashers()
        getUnusedWasherType()
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  return (
    <>
      {!loading && washers.length > 0 &&
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/*inline styling */}
            <h1> Supported Vehicles </h1>
          </div>
          <div className='card animated fadeInDown'>
            <table>
              <thead>
                <tr>
                  <th>Washer ID</th>
                  <th>Washer Type</th>                  
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {washers.map(w => (
                  <tr key={w.wtId}>
                    <td>{w.wtId}</td>
                    <td>{w.wtDescription}</td>
                    
                    <td>
                      <button onClick={ev => onDelete(w)} className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      {loading &&
        <TableText>Loading...</TableText>
      }
      <div>
        {!loading && options.length > 0 &&
          <form onSubmit={onAssign}>
            <label><h1>Add washer type to a washer</h1></label>

            <Select options={options} onChange={(ev) => { setWasherId(ev.value) }} />
            <br />            
            <button className='btn'>Assign</button>
          </form>
        } 
      </div>
    </>
  )
}
