
import { Pagination } from '@mui/material';
import Select from 'react-select';
import { useEffect, useRef } from 'react';
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';



export default function Users() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const isMounted = useRef(false);
  // const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [pageOption, setPageOption] = useState([5])
  //const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const { user, users, setUsers,setNotification } = useStateContext();
  const page = parseInt(searchParams.get('page') == null ? '1' : searchParams.get('page'))

  console.log('Object', Object.keys(user));
  const pageOptions = [
    { value: 3, label: "3" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  useEffect(() => {

    getUsers(page, pageOption);
  }, [page, pageOption])

  const onDelete = (u) => {
    if (!window.confirm(`Are you sure you want to delete ${u.name}?`)) {
      return
    }
    axiosClient.delete(`/users/${u.id}`)
      .then(() => {
        setNotification("User was successfully deleted!")
        getUsers()
      })
  }
  const changePage = (ev) => {
    ev.preventDefault();
    navigate(`/users?page=${ev.target.innerText}`)
    getUsers(ev.target.innerText)
  }
  const getUsers = (i, p) => {
    setLoading(true)
    if (p === undefined) {
      p = pageOption
    }
    axiosClient.get(`users?page=${i}&pageOption=${p}`)
      .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
        setMeta(data.meta)


      })
      .catch(() => {
        setLoading(false)
      })
  }
  console.log(users)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1> List of Users </h1>
        <Link to="/users/new" className='btn-add'>Add new</Link>
      </div>
      <div className='card animated fadeInDown'>

        <div style={{ display: 'flex', fontWeight: 'bold', alignItems: 'center' }}>Show &nbsp;
          <Select
            options={pageOptions} defaultValue={pageOptions[0]}
            onChange={(ev) => { setPageOption(ev.value) }} /> &nbsp; entries
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>User Type</th>
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
                  <td>{u.usertype}</td>
                  <td>
                    <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                    &nbsp;
                    <button onClick={ev => onDelete(u)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
        <Pagination count={meta.last_page} page={page} onChange={changePage} hideNextButton hidePrevButton />

      </div>      
    </div>
  )
}
