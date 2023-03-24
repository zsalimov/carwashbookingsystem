import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axiosClient from '../../axios-client'
import { useStateContext } from '../../contexts/ContextProvider'
import Select from 'react-select';
import VehicleType from './VehicleType'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import WasherType from './WasherType'
import WasherConfig from './WasherConfig'
import WasherPromotion from './WasherPromotion'
import PostProcess from './PostProcess'
import ServiceType from './ServiceType'


export default function WasherForm() {
    const { id } = useParams(false)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(null)
    const [errors, setErrors] = useState(null);
    const [patterns, setPatterns] = useState(null);
    const [options, setOptions] = useState([]);
    const { user, setNotification, setErrorMessage } = useStateContext()
    const [washer, setWasher] = useState({
        wId: null,
        wStoreId: 0,
        wName: '',
        wOpenClosePatternId: '',
    })

    console.log('store_form', user)
    const isNew = id == 'new';
    // const [user, setUser] = useState({
    //     id: null
    // })
    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/washers/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setWasher(data)
                    getPatterns()

                })
                .catch(() => {
                    setLoading(false)
                })

        }, [])
    }
    const getPatterns = () => {
        setLoading(true)
        axiosClient.get('/all_patterns')
            .then(({ data }) => {
                setLoading(false)
                setPatterns(data)
                var patternOptions = data.map(function (p) {
                    return {
                        value: p.ocpId,
                        label: p.ocpName
                    };
                });
                setOptions(patternOptions);
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const onSubmit = (ev) => {
        ev.preventDefault()

        if (washer.wId) {
            axiosClient.put(`/washers/${washer.wId}`, washer)
                .then(() => {
                    setNotification("Washer was successfully updated!")
                    navigate('/washers')

                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })
        } else {
            axiosClient.post(`/washers`, washer)
                .then(({ data }) => {
                    if (data.code < 0) { setErrorMessage(data.description) }
                    else {
                        setNotification(data.description)
                    }

                    if (data.code > 0) {
                        navigate('/washers')
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

    return (
        <>
           
            {!isNew &&  <h1>Update Washer:{' '}{washer.wName}</h1>}

            {isNew && <h1>Add New Washer:</h1>}
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
                        <input className='inputLog' value={washer.wName} onChange={ev => setWasher({ ...washer, wName: ev.target.value })} placeholder='Name' />
                        <Select options={options} value={options.filter(o => o.value === washer.wOpenClosePatternId)} onChange={ev => setWasher({ ...washer, wOpenClosePatternId: ev.value })}
                            placeholder='Pattern' />
                        <br />
                        <button className='btn'>Save</button>
                        &nbsp;
                        <Link to="/washers" className='btn-cancel'>Cancel</Link>

                    </form>
                }

            </div>
            <Tabs defaultIndex={0} onSelect={(index) => console.log(index)}>
                <TabList>
                    <Tab>Vehicles</Tab>
                    <Tab>Washer Type</Tab>
                    <Tab>Configuration</Tab>
                    <Tab>Promotions</Tab>
                    <Tab>Post Process</Tab>
                    <Tab>Service Type</Tab>
                </TabList>

                <TabPanel>
                    <VehicleType />
                </TabPanel>
                <TabPanel>
                    <WasherType />
                </TabPanel>
                <TabPanel>
                    <WasherConfig />
                </TabPanel>
                <TabPanel>
                    <WasherPromotion />
                </TabPanel>
                <TabPanel>
                    <PostProcess />
                </TabPanel>
                <TabPanel>
                    <ServiceType />
                </TabPanel>
            </Tabs>
        </>
    )
}
