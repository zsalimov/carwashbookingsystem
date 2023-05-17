import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { Link } from 'react-router-dom';
import axiosClient from '../../axios-client';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import Map from '../../components/map/Map';
import 'react-calendar/dist/Calendar.css'
import { add, format } from 'date-fns';
import { useStateContext } from '../../contexts/ContextProvider';
import TableText from '../../components/helper/TableText';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';



export default function Reservations() {
  const [position, setPosition] = useState(null)
  const [washers, setWashers] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [active, setActive] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(null)
  const [vehiclesLoaded, setVehiclesLoaded] = useState(false)
  const [washersLoaded, setWashersLoaded] = useState(false)
  const [map, setMap] = useState(false)
  const [zoom, setZoom] = useState(2)
  const [vehicles, setVehicles] = useState([]);
  const [options, setOptions] = useState("");
  const [vehicleId, setVehicleId] = useState([])
  const { user, notification, setNotification } = useStateContext();

  //calendar date and time state 
  const [date, setDate] = useState({
    selectedDate: null | Date,
    dateDate: null | Date,
  })
  const carWash = new Icon({
    iconUrl: "/src/assets/common/carWash.svg",
    iconSize: [35, 35]
  });

   console.log('Date', date?.dateDate, position)
  function getLocation() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }
  const successCallback = (ev) => {
    setPosition({ lat: ev.coords.latitude, lng: ev.coords.longitude })

    setMap(true)
    setZoom(13);
    
  };
  const errorCallback = (error) => {
    console.log(error);
  };
  
  useEffect(() => {
    getLocation()
    fetchVehicles()
    getMyBookings()
    getWashers()
  }, [user])
  
  const myActive = [];
  const myCancelled = [];
  
  myBookings.forEach((booking) => {     
    if (booking.rCancelled === 0) {
      myActive.push(booking)
    }else if (booking.rCancelled === 1) {
      myCancelled.push(booking)
    } else {    
    return myActive}
  })
    

  const getWashers = () => {
    if (position == null) return //guard 
    setLoading(true)
    const payload = {
      lat: position.lat,
      lng: position.lng,
      distance: 15,
      vId: vehicleId
    }

    axiosClient.post('/get_nearest_washers', payload)
      .then(({ data }) => {
        setLoading(false)
        setWashersLoaded(true)
        setWashers(data)
        console.log('Filtered', data);
      })
      .catch(() => {
        setLoading(false)
      })
  }
  
  const getMyBookings = () => {
    setLoading(true)
    axiosClient.post('/my_bookings')
      .then(({ data }) => {
        setLoading(false)
        setMyBookings(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const cancelReservation = (r) => {
    const payload = {
      rId: r.rId,
    }
    axiosClient.post('/cancel_booking', payload)
      .then(({ data }) => {
        setLoading(false)
        if (data > 0) {
          getMyBookings()
          setNotification(
            'Reservation was cancelled'
          )
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const fetchVehicles = async () => {
    if (!user.hasOwnProperty('id')) return
    setLoading(true)
    const res = await axiosClient.post(`/my_vehicles/${user.id}`)
    setVehicles(res.data)  
    setWashers(...vehicles, washers) 

    setVehiclesLoaded(true)
    const vehicleOptions = res.data.map(function (v) {
      return {
        value: v.vId,
        label: v.vPlateNumber + ' (' + v.vtName + ')'
      };
    });
    setOptions(vehicleOptions);
    setLoading(false)
    if (res.data.length > 0) {
      setVehicleId(res.data[0].vId)
    }
  }
  console.log(washers.vtName, 'WASERS')

  return (
    <>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/*inline styling */}
        <h1>Bookings </h1>
      </div>
      {!vehiclesLoaded && <TableText text={'loading...'} />}
      {vehiclesLoaded &&
        (
          vehicles.length == 0 ?
            (<TableText text={'No vehicles found. To add vehicle, please click the button  '} link={'/my_vehicles/new'} linkText={'Add Vehicle'} />)
            :
            (
              <div>
                <div className='card animated fadeInDown'>
                  <Select options={options} defaultValue={options[0]} onChange={(ev) => { setVehicleId(ev.value)}} />
                  <button onClick={ev => getWashers()} disabled={position == null} className="btn-add">Search car wash</button>
                </div>
                {washersLoaded &&
                  <div className='card'>
                    <table>
                      <thead>
                        <tr>
                          <th>Car Wash Store Deatails</th>
                          <th>Car Wash on the Map</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      {loading &&
                        <tbody>
                          <tr>
                            <td colSpan="5" className="text-center">
                              Loading...  <progress value={null} />
                            </td>
                          </tr>
                        </tbody>
                      }
                      {!loading &&
                        (washers.length > 0 ?
                          (<tbody>
                            {washers.map(w => (
                              <tr key={w.wId}>
                                <td>
                                  <hr />
                                  Store name: <h3>{w.sName}</h3>
                                  <hr />
                                  Car Wash Name: <h4>{w.wName} </h4>
                                  <hr />
                                  Vehicle Type: <h4>{w.vtName} </h4>
                                  <hr />
                                  <p> This car wash is ({w.distance} miles away from you)</p>
                                </td>
                                <td>{map &&
                                  <div style={{ width: '800px', height: '200px' }} >
                                    <Map stores={[w]} height={200} zoom={11} position={position} />
                                  </div>}
                                </td>
                                <td>
                                  <Link to={'/reservation_form/' + w.wId + '/' + vehicleId} className='btn-add'>Book Now</Link></td>
                              </tr>
                            ))}
                          </tbody>) :
                          (<tr>
                            <td colSpan="5" className="text-center">
                              No washer found
                            </td>
                          </tr>)
                        )
                      }
                    </table>
                  </div>
                }
              </div>
            )
        )
      }

      {notification &&
        <div className='notification'>
          {notification}

        </div>
      }

      <Tabs defaultIndex={0} onSelect={(index) => console.log(index)}>
        <TabList>
          <Tab>Active Reservation:</Tab>
          <Tab>Canceled Reservations</Tab>
        </TabList>
        <TabPanel>
          <div className='card'>
            <table>
              {!washersLoaded &&
                <thead>
                  <tr>
                    <th></th>
                    <th>Vehicle Name</th>
                    <th>Washer Name</th>
                    <th>Reservation Time</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>}
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
                  {myActive.map((w, i) => (
                    <tr key={w.vId * 100000 + w.wId + i}>
                      <td>{w.vtName}</td>
                      <td>{w.vPlateNumber}</td>
                      <td>{w.wName}</td>
                      <td>{w.rStartTime}</td>
                      <td>£ &nbsp;{w.rPrice.toFixed(2)}</td>
                      <td>
                        <button onClick={ev => cancelReservation(w)} className="btn-delete">Cancel Booking</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              }
            </table>
          </div>
        </TabPanel>
        <TabPanel>
          <div className='card'>
            <table>
              {!washersLoaded &&
                <thead>
                  <tr>
                    <th></th>
                    <th>Vehicle Name</th>
                    <th>Washer Name</th>
                    <th>Reservation Time</th>
                    <th>Price</th>                    
                  </tr>
                </thead>}
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
                <tbody style={{color: 'red'}}>
                  {myCancelled.map((w, i) => (
                    <tr key={w.vId * 100000 + w.wId + i}>
                      <td>{w.vtName}</td>
                      <td>{w.vPlateNumber}</td>
                      <td>{w.wName}</td>
                      <td>{w.rStartTime}</td>
                      <td>£ &nbsp;{w.rPrice.toFixed(2)}</td>                      
                    </tr>
                  ))}
                </tbody>
              }
            </table>
          </div>
        </TabPanel>
      </Tabs>
    </>
  )
}
