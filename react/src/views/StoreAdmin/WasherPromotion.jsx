import React, { useEffect, useState } from 'react'
import TimePicker from 'react-time-picker';
import { Link, useParams } from 'react-router-dom'
import Select from 'react-select';
import axiosClient from '../../axios-client'
import { useStateContext } from '../../contexts/ContextProvider'



export default function WasherPromotion() {
  const { id } = useParams(1)
  const [loading, setLoading] = useState(false)
  const [startMin, setStartMin] = useState('')
  const [endMin, setEndMin] = useState('')
  const [promotions, setPromotions] = useState([])
  const [promotion, setPromotion] = useState(0)
  const { setNotification } = useStateContext()

  const promotionOptions = [
    { value: 0, label: "0 %" },
    { value: 5, label: "5 %" },
    { value: 10, label: "10 %" },
    { value: 15, label: "15 %" },
    { value: 20, label: "20 %" },
    { value: 30, label: "30 %" },
  ];

  useEffect(() => {
    fetchPromotions();

  }, [])

  const fetchPromotions = async () => {
    setLoading(true)
    const res = await axiosClient.get(`/promotion/${id}`)
    setPromotions(res.data)
    console.log(res.data)
    setLoading(false)
  }

  var onAssign = (ev) => {
    ev.preventDefault()
    const payload = {
      wpWasherId: id,
      wpStartMin: startMin,
      wpEndMin: endMin,
      wpPromotionRate: promotion,
    }
    axiosClient.post(`/add_promotion`, payload)
      .then(() => {
        setNotification("Promotion was successfully assigned!") 
        fetchPromotions()
        setPromotion(0)
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
      {!loading && promotions.length > 0 &&
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/*inline styling */}
            <h1> Assigned Promotions </h1>
          </div>
          <div className='card animated fadeInDown'>
            <table>
              <thead>
                <tr>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Promotion Rate</th>
                </tr>
              </thead>
              <tbody>
                {promotions.map(p => (
                  <tr key={p.wpStartMin}> {/*unique key generation*/}                    
                    <td>{p.wpStartMin}</td>
                    <td>{p.wpEndMin}</td>
                    <td>{p.wpPromotionRate} %</td>
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
        {!loading &&
          <form onSubmit={onAssign}>
            <label><h1>Add new Promotion</h1></label>
            <span style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <label style={{ marginRight: "10px" }}>Start Time</label>
            <TimePicker
              value={startMin}
              format={'HH:mm'}
              disableClock
              onChange={setStartMin} />
            <label style={{ marginLeft: "50px", marginRight: "10px" }}>End Time</label>
            <TimePicker
              disableClock
              value={endMin}
              format={'HH:mm'}
              onChange={setEndMin} />
              <label style={{ marginLeft: "50px", marginRight: "10px" }}>Promotion Rate</label>
            <Select style={{innerWidth: '200px'}} 
              options={promotionOptions} defaultValue={promotionOptions.filter(o => o.value === 0)}
              onChange={(ev) => { setPromotion(ev.value) }} />
            </span>
            <br />
            <button className='btn'>Assign</button>
          </form>          
        }
      </div>
    </>
  )
}
