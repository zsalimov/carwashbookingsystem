import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axiosClient from '../../axios-client'
import { useStateContext } from '../../contexts/ContextProvider'
import Select from 'react-select';
import ExternalStateExample from '../../components/map/ExternalStateExample'
import Map from '../../components/map/Map'


export default function StoreForm() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(null)
    const [errors, setErrors] = useState(null);
    const [users, setUsers] = useState(null);
    const [userId, setUserId] = useState(0);
    const [position, setPosition] = useState([]);
    const [options, setOptions] = useState("");
    const [change, setChange] = useState(false)
    const {notification, setNotification, setErrorMessage } = useStateContext()    
    const [store, setStore] = useState({
        sId: 0,
        sCompanyId: 0,
        sName: '',
        sLatitude: -200,
        sLongitude: -200,
    })
    const stores = [];
    function getLocation() {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      }
      const successCallback = (ev) => {
        setPosition({ lat: ev.coords.latitude, lng: ev.coords.longitude })
      };
      const errorCallback = (error) => {
        console.log(error);
      };

      useEffect(() => {       
        getLocation();
        getUsers()
      }, [])
     
    document.addEventListener('mapChanged', (x) => {
        if (x.detail.lat !== undefined && x.detail.lng !== undefined) {
            setStore({ ...store, sLatitude: x.detail.lat, sLongitude: x.detail.lng })
            setChange(true)
        }
    })   
    if (id) {
        useEffect(() => {
            getUsers()
            setLoading(true)
            axiosClient.get(`/stores/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setStore(data)                    
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    } 
    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users_0')  //user type of 0 "customers"
            .then(({data}) => {
                setLoading(false)
                setUsers(data)  
                             
                var userOptions = data.map(function (u) {
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
        if (store.sLatitude < -180 || store.sLongitude < -180) {
            setNotification('Please choose a correct location from the Map')
            alert('Please choose a correct location from the Map')
        } else if (store.sId && change) {
            setChange(false)
            axiosClient.put(`/stores/${store.sId}`, store)
                .then(() => {
                    setNotification("Store was successfully updated!")
                    navigate('/stores')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })
        } else {
            axiosClient.post(`/stores`, store)
                .then(({ data }) => {
                    if (data.code < 0) { setErrorMessage(data.description) }
                    else {
                        setNotification(data.description)
                    }

                    if (data.code > 0) {
                        navigate('/stores')
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

        if (store.sId && userId) {
            axiosClient.put(`/stores/${store.sId}|${userId}`)
                .then(() => {
                    setNotification("Store admin was successfully assigned!")
                    navigate('/stores')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })
        }

    }
    console.log(position)


    return (
        <>
            {store.sId && <h1>Update Store: {store.sName}</h1>}

            {!store.sId && <h1>Add New Store:</h1>}
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
                        <Map stores={stores} position={position} zoom={11} height={300} />
                        <input className='inputLog' value={store.sName} onChange={ev => {setStore({ ...store, sName: ev.target.value }), setChange(true)}} placeholder='Name' />
                       
                        <button className='btn'>Save</button>
                        &nbsp;
                        <Link to="/stores" className='btn-cancel'>Cancel</Link>
                        
                    </form>
                }
                <br />

                {!loading &&
                    <form onSubmit={onAssign}>
                        <label><h1> Assign StoreAdmin to a store</h1></label>

                        <Select options={options} onChange={(ev) => { setUserId(ev.value) }} />

                        <button className='btn'>Assign</button>
                    </form>
                }
            </div>
        </>
    )
}
