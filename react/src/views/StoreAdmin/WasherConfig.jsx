import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Select from 'react-select';
import axiosClient from '../../axios-client'
import { useStateContext } from '../../contexts/ContextProvider'

export default function WasherConfig() {
  const { id } = useParams(1)
  const [options, setOptions] = useState("");
  const [loading, setLoading] = useState(false)
  const [washers, setWashers] = useState([])
  const { setNotification } = useStateContext()

  const minuteOptions = [
    { value: 3, label: "3 minutes" },
    { value: 5, label: "5 minutes" },
    { value: 10, label: "10 minutes" },
    { value: 15, label: "15 minutes" },
    { value: 20, label: "20 minutes" },
  ];

  const priceOptions = [
    { value: 3.99, label: "£ 3.99" },
    { value: 4.99, label: "£ 4.99" },
    { value: 6.99, label: "£ 6.99" },
    { value: 9.99, label: "£ 9.99" },
    { value: 14.99, label: "£ 14.99" },
    { value: 19.99, label: "£ 19.99" },
  ];

  useEffect(() => {
    fetchWashers();

  }, [])

  const fetchWashers = async () => {
    setLoading(true)
    const res = await axiosClient.get(`/config/${id}`)
    setWashers(res.data)
    console.log(res.data)
    setLoading(false)
  }

  var onUpdateDuration = (wtId, vtId, durationMin) => {
    //ev.preventDefault()
    const payload = {
      wId: id,
      wtId: wtId,
      vtId: vtId,
      durationMin: durationMin
    }
    axiosClient.post(`/update_duration`, payload)
      .then(() => {
        setNotification("Duration was successfully assigned!")
        //fetchWashers()       
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  var onUpdatePrice = (wtId, vtId, price) => {
    //ev.preventDefault()
    const payload = {
      wId: id,
      wtId: wtId,
      vtId: vtId,
      price: price
    }
    axiosClient.post(`/update_price`, payload)
      .then(() => {
        setNotification("Price was successfully assigned!")
        //fetchWashers()       
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
                  <th>Washer Name</th>
                  <th>Washer Type</th>
                  <th>Vehicle Type</th>
                  <th>Duration in Minutes</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {washers.map(w => (
                  <tr key={w.wId * 1000000 + w.wtId * 1000 + w.vtId}> {/*unique key generation*/}
                    <td>{w.wName}</td>
                    <td>{w.wtDescription}</td>
                    <td>{w.vtName}</td>
                    <td><Select options={minuteOptions} defaultValue={minuteOptions.filter(o => o.value === w.wwtvtDurationMin)} onChange={(ev) => { onUpdateDuration(w.wtId, w.vtId, ev.value) }} /></td>
                    <td><Select options={priceOptions} defaultValue={priceOptions.filter(o => o.value === w.wwtvtPrice)} onChange={(ev) => { onUpdatePrice(w.wtId, w.vtId, ev.value) }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </>
  )
}
