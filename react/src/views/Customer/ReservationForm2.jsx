import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import axiosClient from '../../axios-client';
import { add, format } from 'date-fns';
import { Calendar } from 'react-calendar';


import { useStateContext } from '../../contexts/ContextProvider';
import TableText from '../../components/helper/TableText';

// Create a custom Button component to able to select a individual time slot and if selected,
// the time slot will be coloured red.
const Button = ({ children, current, id, onClick }) => {
    return (
        <button id={id} disabled={current && current === id} onClick={onClick}>
            {children}
        </button>
    );
}
let x = 0
let y = 0
export default function ReservationForm() {
    const { wId, vId } = useParams(null)
    const [loading, setLoading] = useState(null)
    const [options, setOptions] = useState([])
    const [timesReady, setTimesReady] = useState(false)
    const [times, setTimes] = useState([])
    const [washerVehicle, setWasherVehicle] = useState(null)
    const [wtId, setWtId] = useState(0)
    const [current, setCurrent] = useState({ id: false | String })
    const [date, setDate] = useState({
        selectedDate: null | Date,
        dateDate: null | Date,
    })
    const { user, notification, setNotification } = useStateContext();




    useEffect(() => {
        if (wId && vId && options.length === 0) {
            getWasherTypes()
        }

        if (date.selectedDate !== null && date.selectedDate != 0) {
            setTimesReady(false)
            getOptions(wtId);
        }

    }, [date, user])

    const handleWTChange = (ev) => {
        
        if (date.selectedDate !== null && date.selectedDate != 0) {
            getOptions(ev.value)
        }
    }

    const getWasherTypes = () => {
        const payload = {
            wId: wId,
            vId: vId
        }
        axiosClient.post('/get_washer_washer_type', payload)
            .then(({ data }) => {
                setLoading(false)
                const vehicleOptions = data.map(function (v) {
                    return {
                        value: v.wtId,
                        label: v.wtDescription,
                    };
                });
                setOptions(vehicleOptions);
            })
            .catch(() => {
                setLoading(false)
            })
    }
    console.log(date, '0')
   
    const handleClick = (e) => {
        e.preventDefault()


        x = e.target.id.charAt(0)
        y = e.target.id.charAt(1)
        setCurrent(x.toString() + y.toString());
        debugger;

    }
    function getTimes(op, cl, interval) {

        if (!date.selectedDate) return  //guard close

        const { selectedDate } = date;

        const open = add(selectedDate, { hours: op })
        const close = add(selectedDate, { hours: cl })
        const times = []
        let hours = []
        let lastHour = open.getHours()

        for (let i = open; i <= close; i = add(i, { minutes: interval })) {
            if (i.getHours() !== lastHour) {
                times.push(hours)
                hours = []
            }
            hours.push(i)
            lastHour = i.getHours()

        }

        return times
    }
    console.log(times)
    const getOptions = (washerTypeId) => {
        const payload = {
            wId: wId,
            vId: vId,
            wtId: washerTypeId,
            date: date.selectedDate,
            day: date.selectedDate.getDay(),
        }

        setLoading(true)
        axiosClient.post('/get_washer_vehicle', payload)
            .then(({ data }) => {
                setLoading(false)
                if (data.length > 0) {
                    setWasherVehicle(data[0])
                    let x = getTimes(data[0].pattern.ocdStartTime, data[0].pattern.ocdEndTime, data[0].wwtvtDurationMin)
                    let inter = data[0].wwtvtDurationMin
                    setTimes(data[0].times)
                    console.log(data[0].times, x, 'TIMES')
                    console.log(format(date.dateDate, 'kk:mm'), inter, 'options')
                    setTimesReady(true)
                }
            })
            .catch(() => {
                setLoading(false)
            })
    }


    return (
        <div>
            <div className='card animated fadeInDown' >
                <h1>Reservation Form</h1>

                <Select options={options} defaultValue={options[0]} onChange={(ev) => { setWtId(ev.value), handleWTChange(ev) }} />
            </div>
            {loading && <TableText text={'Loading...'} />}

            {!loading && wtId > 0 && (
                <div className='card'>
                    {date.selectedDate && timesReady ? (
                        <div id='timeSelector'> <div id='textOpen'> Available slots on: {format(date.selectedDate, 'dd-MMM-yyyy')} </div>

                            {times?.map((hours, i) => (
                                <div key={`hours-${i}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className='timeRows'>{format(hours[0], 'kk:mm')}</div>
                                    {hours.map((time, j) => (
                                        // <button key={`time-${j}`} type='button'  onClick={() =>{ setDate((prev) => ({ ...prev, dateDate: time }) ) , handleClick()} }>
                                        //     {format(time, 'kk:mm')}                                            
                                        // </button>
                                        <Button key={`time-${j}`} id={`${i}${j}`}

                                            current={current} onClick={(e) => { setDate((prev) => ({ ...prev, dateDate: time })), handleClick(e) }}>{format(time, 'kk:mm')}</Button>
                                    ))}
                                </div>
                            ))}
                            {/* Clear the hours display and return the Calendar */}
                            <button
                                type='button'
                                className='btn-add'
                                style={{ width: `100%` }}
                                onClick={() => { setDate((prev) => ({ ...prev, selectedDate: 0 })) }}>
                                Change Date
                            </button>

                        </div>) : (
                        <Calendar
                            minDate={new Date()}
                            view={'month'}
                            onClickDay={(date) => {
                                setDate((prev) => ({ ...prev, selectedDate: date }))
                            }}
                        />
                    )
                    }
                </div>
            )}


        </div>
    )
}
