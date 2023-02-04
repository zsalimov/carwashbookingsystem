import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Select from 'react-select';
import axiosClient from '../../axios-client'
import { useStateContext } from '../../contexts/ContextProvider'

export default function VehicleType() {
  const { id } = useParams(1)
  const [options, setOptions] = useState("");
  const [loading, setLoading] = useState(false)
  const [vechicles, setVechicles] = useState([])
  const [vehicleId, setVehicleId] = useState([])
  const [min, setMin] = useState(5)
  const { setNotification } = useStateContext()
  const minuteOptions = [
    { value: 3, label: "3 minutes" },
    { value: 5, label: "5 minutes" },
    { value: 10, label: "10 minutes" },
    { value: 15, label: "15 minutes" },
    { value: 20, label: "20 minutes" },
  ];

  useEffect(() => {
    fetchVehicles();
    getUnusedVehicles()
  }, [])

  const fetchVehicles = async () => {
    setLoading(true)
    const res = await axiosClient.get(`/vehicles/${id}`)
    setVechicles(res.data)
    setLoading(false)
  }

  const onDelete = (v) => {
    if (!window.confirm(`Are you sure you want to delete ${v.vtName}?`)) {
      return
    }
    const payload = {
      wId: id,
      vtId: v.vtId
    }
    axiosClient.post(`/vehicles`, payload)
      .then(() => {
        setNotification("Vehicle was successfully deleted!")
        fetchVehicles()
        getUnusedVehicles()
      })
  }

  const getUnusedVehicles = () => {
    setLoading(true)
    axiosClient.post(`/vehicles/${id}`)
      .then(({ data }) => {
        setLoading(false)

        const vehicleOptions = data.map(function (v) {
          return {
            value: v.vtId,
            label: v.vtName
          };
        });
        setOptions(vehicleOptions);
      })
      .catch(() => {
        setLoading(false)
      })
  }

  var onAssign = (ev) => {
    ev.preventDefault()
    const payload = {
      wvWasherId: id,
      wvVehicleTypeId: vehicleId,
      wvDurationMin: min,
    }
    axiosClient.post(`/add_vehicles`, payload)
      .then(() => {
        setNotification("Vehicle was successfully assigned!")
        fetchVehicles()
        getUnusedVehicles()
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
      {!loading && vechicles.length > 0 &&
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/*inline styling */}
            <h1> Supported Vehicles </h1>
          </div>
          <div className='card animated fadeInDown'>
            <table>
              <thead>
                <tr>
                  <th>Vehicle ID</th>
                  <th>Vehicle Name</th>
                  <th>Duration in minutes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vechicles.map(v => (
                  <tr key={v.vtId}>
                    <td>{v.vtId}</td>
                    <td>{v.vtName}</td>
                    <td>{v.wvDurationMin}</td>
                    <td>
                      <button onClick={ev => onDelete(v)} className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      {loading &&
        <div className='card animated fadeInDown'>
          <div className='text-center'>  Loading...  <progress value={50} /></div>
        </div>
      }
      <div>
        {!loading && options.length > 0 &&
          <form onSubmit={onAssign}>
            <label><h1>Add vehicle type to a washer</h1></label>

            <Select options={options} onChange={(ev) => { setVehicleId(ev.value) }} />
            <br />
            <Select options={minuteOptions} onChange={(ev) => { setMin(ev.value) }} />
            <br />
            <button className='btn'>Assign</button>
          </form>
        }
      </div>
    </>
  )
}
