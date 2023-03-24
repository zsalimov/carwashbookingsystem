import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Select from 'react-select';
import axiosClient from '../../axios-client'
import { useStateContext } from '../../contexts/ContextProvider'

export default function ServiceType() {
  const { id } = useParams(1)
  const [options, setOptions] = useState("");
  const [loading, setLoading] = useState(false)
  const [types, setTypes] = useState([])
  const [serviceId, setServiceId] = useState([])
  const [price, setPrice] = useState(5)
  const { setNotification } = useStateContext()

  const priceOptions = [
    { value: 3.99, label: "£ 3.99" },
    { value: 4.99, label: "£ 4.99" },
    { value: 6.99, label: "£ 6.99" },
    { value: 9.99, label: "£ 9.99" },
    { value: 14.99, label: "£ 14.99" },
    { value: 19.99, label: "£ 19.99" },
    { value: 29.99, label: "£ 29.99" },
    { value: 34.99, label: "£ 34.99" },
    { value: 49.99, label: "£ 49.99" },
  ];

  useEffect(() => {
    fetchServices();
    getUnusedServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    const res = await axiosClient.get(`/service_types/${id}`)
    setTypes(res.data)
    setLoading(false)
  }

  const onDelete = (v) => {
    if (!window.confirm(`Are you sure you want to delete ${v.stName}?`)) {
      return
    }
    const payload = {
      wId: id,
      stId: v.stId
    }
    axiosClient.post(`/service_types`, payload)
      .then(() => {
        setNotification("Service Type was successfully deleted!")
        fetchServices()
        getUnusedServices()
      })
  }

  const getUnusedServices = () => {
    setLoading(true)
    axiosClient.post(`/service_types/${id}`)
      .then(({ data }) => {
        setLoading(false)

        const serviceOptions = data.map(function (v) {
          return {
            value: v.stId,
            label: v.stName
          };
        });
        setOptions(serviceOptions);
      })
      .catch(() => {
        setLoading(false)
      })
  }

  var onAssign = (ev) => {    
    ev.preventDefault()
    const payload = {
      wstWasherId: id,
      wstServiceTypeId: serviceId,
      wstPrice: price     // prevent extra controller changes and table column delete
    }
    axiosClient.post(`/add_service_types`, payload)
      .then(() => {
        setNotification("Service Type was successfully assigned!")
        fetchServices()
        getUnusedServices()
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
      {!loading && types.length > 0 &&
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/*inline styling */}
            <h1> Supported Service Types </h1>
          </div>
          <div className='card animated fadeInDown'>
            <table>
              <thead>
                <tr>
                  <th>Service Type ID</th>
                  <th>Service Type Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {types.map(v => (
                  <tr key={v.stId}>
                    <td>{v.stId}</td>
                    <td>{v.stName}</td>
                    <td>{v.wstPrice}</td>
                    <td>
                      <button onClick={ev => onDelete(v)} className="btn-delete">Delete</button>
                    </td>
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
        {!loading && options.length > 0 &&
          <form onSubmit={onAssign}>
            <label><h1>Add service type to a washer</h1></label>

            <Select options={options} onChange={(ev) => { setServiceId(ev.value) }} />
            
            <Select menuPlacement='auto' options={priceOptions}  defaultValue={priceOptions.filter(o => o.value === price)} onChange={(ev) => { setPrice(ev.value) }} />
            <br />
            <button className='btn'>Assign</button>
          </form>
        }
      </div>
    </>
  )
}
