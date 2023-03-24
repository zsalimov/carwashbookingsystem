import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axiosClient from '../../axios-client'
import { useStateContext } from '../../contexts/ContextProvider'
import Select from 'react-select';
import 'react-tabs/style/react-tabs.css';



export default function MyVehiclesForm() {
    const { id } = useParams(null)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(null)
    const [errors, setErrors] = useState(null);
    const [patterns, setPatterns] = useState(null);
    const [options, setOptions] = useState([]);
    const { user, notification, setNotification, setErrorMessage } = useStateContext()
    const [vehicle, setVehicle] = useState({
        vId: 0,
        vPlateNumber: '',
        vVehicleTypeId: 1,
    })


    let isNew = id === undefined;
    // const [user, setUser] = useState({
    //     id: null
    // })
    if (id) {
        useEffect(() => {
            setLoading(true)            
            axiosClient.post(`/my_vehicle/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setVehicle(data[0])
                    getVehicleType()
                })
                .catch(() => {
                    setLoading(false)
                    
                })

        }, [])
    }
    else {
        useEffect(() => {            
            getVehicleType()
        }, [])
    }
    const getVehicleType = () => {
        setLoading(true)        
        axiosClient.post('/my_vehicle_types')
            .then(({ data }) => {
                setLoading(false)
                var vtOptions = data.map(function (p) {
                    return {
                        value: p.vtId,
                        label: p.vtName
                    };
                });
                setOptions(vtOptions);
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const onSubmit = (ev) => {
        ev.preventDefault()

        if (vehicle.vId) {
            axiosClient.put(`/my_vehicles/${vehicle.vId}`, vehicle)
                .then(() => {
                    setNotification("Vehicle was successfully updated!")
                    navigate('/myvehicles')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })
        } else {
            
            axiosClient.post(`/my_vehicles`, vehicle)
                .then(({ data }) => {
                    if (data.code < 0) { setErrorMessage(data.description) }
                    else {
                        setNotification(data.description)
                    }

                    if (data.code > 0) {
                        navigate('/myvehicles')
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
          console.log(isNew, id, 'new')
    return (
        <>

            {!isNew && <h1>Update Vehicle:{' '}{vehicle.vPlateNumber}</h1>}

            {isNew && <h1>Add New Vehicle:</h1>}
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
                        <input className='inputLog' value={vehicle.vPlateNumber} onChange={ev => setVehicle({ ...vehicle, vPlateNumber: ev.target.value })} placeholder='Car Plate Number' />
                        <Select options={options} value={options.filter(o => o.value === vehicle.vVehicleTypeId)} onChange={ev => setVehicle({ ...vehicle, vVehicleTypeId: ev.value })}
                            placeholder='Vehicle Type' />
                        <br />
                        <button className='btn'>Save</button>
                        &nbsp;
                        <Link to="/myvehicles" className='btn-cancel'>Cancel</Link>

                    </form>
                }

            </div>
            {notification &&
                <div className='notification'>
                    {notification} </div>}
        </>
    )
}
