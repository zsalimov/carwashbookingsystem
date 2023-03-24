import { useEffect, useRef, useState } from 'react'
import axiosClient from '../../../axios-client'
import './info.css'

export default function Info() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    fetchStat()
  }, [])
  const fetchStat = async () => {
    setLoading(true)
    const res = await axiosClient.post(`/statistics`)
    setData(res.data)
    console.log(res.data)
    setLoading(false)
    // setTimeout(() => {
    //   fetchStat()
    // },1000)       
  }


  const onDivClick = () => {
    setShowInfo(true)

  }
  const onInfoClick = () => {
    setShowInfo(false)
  }


  return (
    <>
      {!showInfo ? <div className="statistic" onClick={onDivClick}> Stock info for more <strong style={{ color: 'blue' }}>please click</strong> </div>
        : <div onClick={onInfoClick}>
          {data.length > 0 && <div className='featuredCard'>
            <div className="featuredItem">
              <span className='featuredTitle'>{data[0].name}</span>
              <div className="container">
                <div className="featuredMoney">£{data[0].revenue}</div>
                <div className="featuredMoneyRate">{data[0].rate} </div>
                {data[0].rate < 0 ? <div className='down'></div> : <div className='up'></div>}
              </div>
              <span className="featuredSubTitle">Compared to last month</span>
            </div>
            <div className="featuredItem">
              <span className='featuredTitle'>{data[1].name}</span>
              <div className="container">
                <div className="featuredMoney">£{data[1].revenue}</div>
                <div className="featuredMoneyRate">{data[1].rate} </div>
                {data[1].rate < 0 ? <div className='down'></div> : <div className='up'></div>}
              </div>
              <span className="featuredSubTitle">Compared to yesterday</span>
            </div>
            <div className="featuredItem">
              <span className='featuredTitle'>{data[2].name}</span>
              <div className="container">
                <div className="featuredMoney">£{data[2].revenue}</div>
                <div className="featuredMoneyRate">{data[2].rate} </div>
                {data[2].rate < 0 ? <div className='down'></div> : <div className='up'></div>}
              </div>
              <span className="featuredSubTitle">Compared to the last year</span>
            </div>

          </div>}
        </div>}
    </>
  )
}
