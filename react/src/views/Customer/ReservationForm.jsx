import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axiosClient from '../../axios-client';
import { add, format } from 'date-fns';
import { Calendar } from 'react-calendar';


import { useStateContext } from '../../contexts/ContextProvider';
import TableText from '../../components/helper/TableText';

// Create a custom Button component to able to select a individual time slot and if selected,
// the time slot will be coloured red.
// const Button = ({ children, current, id, onClick }) => {
//     return (
//         <button id={id} disabled={current && current === id} onClick={onClick}>
//             {children}
//         </button>
//     );
// }

export default function ReservationForm() {
    const { wId, vId } = useParams(null)

    const navigate = useNavigate();
    const [loading, setLoading] = useState(null)
    const [options, setOptions] = useState([])
    const [timesReady, setTimesReady] = useState(false)
    const [times, setTimes] = useState([])
    const [washerVehicle, setWasherVehicle] = useState(null)
    const [wtId, setWtId] = useState(0)
    const [date, setDate] = useState({
        selectedDate: null | Date,
        reservationTime: null | Date,
    })
    const { user, notification, setNotification } = useStateContext();

    const now = new Date()

    useEffect(() => {
        if (wId && vId && options.length === 0) {
            getWasherTypes()
        }

        if (date.selectedDate !== null && date.selectedDate != 0) {
            //setTimesReady(false)
            getOptions(wtId);
        }
        console.log(date.selectedDate.toString(), timesReady, 'Audi')
    }, [date])

    const handleWTChange = (ev) => {

        if (date.selectedDate !== null && date.selectedDate != 0) {
            getOptions(ev.value)
        }
    }

    const createReservation = () => {
        const payload = {
            rWasherId: wId,
            rVehicleId: vId,
            rStartTime: date.reservationTime.time,
            rEndTime: washerVehicle.wwtvtDurationMin,
            rPrice: date.reservationTime.price,
            rCancelled: 0
        }
       
        axiosClient.post('/create_reservation', payload)
            .then(({ data }) => {
                setLoading(false)
                if (data > 0) {
                    navigate('/reservations')
                    setNotification(
                        'Reservation created successfully'
                    )
                }


            })
            .catch(() => {
                setLoading(false)
            })
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

    const getOptions = (washerTypeId) => {
        const payload = {
            wId: wId,
            vId: vId,
            wtId: washerTypeId,
            day: date.selectedDate.getDay(),
            month: date.selectedDate.getMonth() + 1,
            year: date.selectedDate.getYear() + 1900,
            date: date.selectedDate.getDate(),
        }

        setLoading(true)
        axiosClient.post('/get_washer_vehicle', payload)
            .then(({ data }) => {
                setLoading(false)
                if (data.length > 0) {
                    setWasherVehicle(data[0])
                    setTimes(data[0].times)
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

            {date.reservationTime != null && timesReady &&
                <div className='card' >
                    <div className="featuredItem1" style={{ background: (date.reservationTime.promotion !== undefined && date.reservationTime.promotion !== 0 ? 'red' : 'blue') }}>
                        <div>Price: {date.reservationTime.price === undefined ? '£ 0.00' : '£ ' + date.reservationTime.price}, Promotion Rate: {date.reservationTime.promotion} % </div>
                    </div>
                    <div  ><button className='btn-add' style={{ margin: '4px 20px' }} onClick={createReservation}>Create Reservation</button></div>
                </div>}

            {!loading && wtId > 0 && (
                <div className='card'>
                    {date.selectedDate && timesReady ? (
                        <div id='timeSelector'> <div id='textOpen'> Available slots on: {format(date.selectedDate, 'dd-MMM-yyyy')} </div>

                            {times?.map((hours, i) => (
                                <div key={`hours-${i}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className='timeRows'>{hours[0].name}</div>
                                    {hours.map((time, j) => (
                                        <button key={`${i}${j}`} className={'btn' + (date.reservationTime !== null && date.reservationTime.name === time.name ? '9' : time.status)} disabled={time.status > 0} type='button'
                                            onClick={() => setDate((prev) => ({ ...prev, reservationTime: time }))}>
                                            <span style={{ fontSize: '16px' }}>{time.name}</span> / <span style={{ fontSize: '10px', background: 'green', color: 'white' }}>£{time.price}</span>
                                        </button>
                                        // <Button key={`time-${j}`} id={`${i}${j}`} disabled={time.disabled == 1}
                                        //     current={current} onClick={(e) => { setDate((prev) => ({ ...prev, reservationTime: time })), handleClick(e) }}>{time.name}</Button>
                                    ))}
                                </div>
                            ))}
                            {/* Clear the hours display and return the Calendar */}
                            <button
                                type='button'
                                className='btn-add'
                                style={{ width: `100%`, fontSize: '20px' }}
                                onClick={() => { setDate((prev) => ({ ...prev, selectedDate: 0 })) }}>
                                Choose another Date
                            </button>

                        </div>) : (
                        <Calendar
                            minDate={now}
                            view={'month'}
                            onClickDay={(date) => {
                                setDate((prev) => ({ ...prev, selectedDate: date }))
                            }}
                        />
                    )
                    }
                </div>
            )}
            {notification &&
                <div className='notification'>
                    {notification}

                </div>
            }
        </div>
    )
}
