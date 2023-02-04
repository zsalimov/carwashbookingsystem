import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';
import car1 from '../../assets/img/car1.jpg'

export default function CompanyUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setNotification } = useStateContext();


  console.log('Company user', user)
  useEffect(() => {
    getUsers();
  }, [])

  const onDelete = (u) => {
    if (!window.confirm(`Are you sure you want to dismiss ${u.name}?`)) {
      return
    }
    axiosClient.delete(`/dismiss/${u.id}`)
      .then(() => {
        setNotification("User was successfully dismissed!")
        getUsers()
      })
  }
  const getUsers = () => {
    setLoading(true)
    axiosClient.get(`/company_users`)
      .then(({ data }) => {
        setLoading(false)
        setUsers(data)

      })
      .catch(() => {
        setLoading(false)
      })
  }
  return (
    <>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <h1> Users </h1>

      </div>


      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Store Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading &&
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...<progress value={null} />
                </td>
              </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>{u.sname}</td>
                  <td>
                    <button onClick={ev => onDelete(u)} className="btn-delete">Dismiss</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </>
  )
}
