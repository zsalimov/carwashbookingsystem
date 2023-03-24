import { width } from '@mui/system'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../axios-client';
import Map from '../../components/map/Map'
import { useStateContext } from '../../contexts/ContextProvider';

export default function MyVehicles() {
    const [loading, setLoading] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [map, setMap] = useState(false);
    const [zoom, setZoom] = useState(7);
    const [position, setPosition] = useState();
    const { user, notification, setNotification } = useStateContext();

    function getLocation() {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
    const successCallback = (ev) => {
        setPosition({ lat: ev.coords.latitude, lng: ev.coords.longitude })

        setMap(true)
        setZoom(7);

    };
    const errorCallback = (error) => {
        console.log(error);
    };

    useEffect(() => {
        getLocation()
        fetchVehicles();
       
    }, [user])

    const fetchVehicles = async () => {
        if (!user.hasOwnProperty('id')) return
        setLoading(true)
        const res = await axiosClient.post(`/my_vehicles/${user.id}`)
        setVehicles(res.data)       
        setLoading(false)
    }
    console.log(position, 'My Reservetion Position', user)

    const onDelete = (v) => {
        if (!window.confirm(`Are you sure you want to delete ${v.vPlateNumber}?`)) {
            return
        }
        axiosClient.delete(`/my_vehicles/${v.vId}`)
            .then(() => {
                setNotification("Vehicle was successfully deleted!")
                fetchVehicles()
            })
    }

    return (
        <div>
            <div className='myvehicles'> <div className="cartext">Professional Car Wash</div>  </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/*inline styling */}
                <h1>My Vehicles </h1>
                <Link to="/my_vehicles/new" className='btn-add'>Add new</Link>
            </div>

            {vehicles.length > 1 ? (<div style={{ width: '70%', float: 'left', justifyContent: 'center' }}>
                <div className='card animated fadeInDown'>
                    <table>
                        <thead>
                            <tr>
                                <th>Car ID</th>
                                <th>Car Plate Number</th>
                                <th>Vehicle Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {loading &&
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        Loading...<progress value={null} />
                                    </td>
                                </tr>
                            </tbody>
                        }
                        {!loading &&
                            <tbody>
                                {vehicles.map((v) => (
                                    <tr key={v.vId}>
                                        <td>{v.vId}</td>
                                        <td>{v.vPlateNumber}</td>
                                        <td>{v.vtName}</td>
                                        <td>
                                            <Link className="btn-edit" to={'/my_vehicles/' + v.vId}>Edit</Link>
                                            &nbsp;
                                            <button onClick={ev => onDelete(v)} className="btn-delete">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        }
                    </table>

                </div>
                {notification &&
                    <div className='notification'>
                        {notification}

                    </div>
                }

            </div> ) : (!loading && 
            <div style={{ width: '70%', float: 'left', justifyContent: 'center' }}>
            <div className='card animated fadeInDown'> 
             <h1>No vehicle found. <br /> Please add vehicle!</h1>
             </div>
            </div>)
            }
            {map && <div style={{ width: '30%', height: '100px', float: 'right' }}>
                <Map zoom={zoom} position={position} height={300} stores={[]} />
            </div>
            }
        </div>
    )
}
