import './chart.css'
import React, { PureComponent, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default function Chart() {
    const [showStats, setShowStats] = useState(false)
    const data1 = [
        {
            name: 'Jan',
            au : 500,

        },
        {
            name: 'Feb',
            au: 300,

        },
        {
            name: 'Mar',
            au: 1000,

        },
        {
            name: 'Apr',
            au: 780,

        },
        {
            name: 'May',
            au: 1890,

        },
        {
            name: 'Jun',
            au : 500,

        },
        {
            name: 'Jul',
            au: 300,

        },
        {
            name: 'Aug',
            au: 2000,

        },
        {
            name: 'Sep',
            au: 2780,

        },
        {
            name: 'Oct',
            au: 1890,

        },        
        {
            name: 'Nov',
            au: 400,

        },
        {
            name: 'Dec',
            au: 3780,

        }
    ];

    const onDivClick = () => {
        setShowStats(true)
    
      }
      const onInfoClick = () => {
        setShowStats(false)
      }
    return (
        <>
        {!showStats ? <div className="salesStat" onClick={onDivClick}> Sales analytics for more <strong style={{color: 'blue'}}>please click</strong> </div> 
       : <div onClick={onInfoClick}>
        <div className='chartCart'>
            <h3 className='chartTitle'>Sales analytics</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data1}  margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>

                    <XAxis dataKey="name" stroke="#CC00FF" />
                    <Line type="monotone" dataKey="au" stroke="#CC00FF" />
                    <CartesianGrid />
                    <Tooltip/>
                </LineChart>
            </ResponsiveContainer>
        </div>
        </div>}
        </>
    )
}
