
import { Pagination } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useState } from 'react'
import { Link, useNavigate, useSearchParams} from 'react-router-dom';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';


export default function Users() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()  
  const isMounted = useRef(false);
  const [users, setUsers] = useState([]);
  const [meta,setMeta] = useState({});
  //const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const {user,setNotification} = useStateContext();
  const page = parseInt(searchParams.get('page') == null ? '1':searchParams.get('page'))
  
  console.log('User',user,page);
  
  useEffect(() => {       
    
    getUsers(page);     
  }, [])
  
  const onDelete = (u) => {
    if (!window.confirm(`Are you sure you want to delete ${u.name}?`)) {
      return
    }
    axiosClient.delete(`/users/${u.id}`)
      .then(()=> {
        setNotification("User was successfully deleted!")
        getUsers()
      })
  }
  const changePage = (ev) => {    
    navigate(`/users?page=${ev.target.innerText}`) 
    getUsers(ev.target.innerText) 
  }
  const getUsers = (i) => {
    setLoading(true)
    axiosClient.get(`/users?page=${i}`)
    .then(({data}) => {
      setLoading(false)
      setUsers(data.data)
      setMeta(data.meta)
      
      
    })
    .catch(() => {
      setLoading(false)
    })
  }
  console.log(users)
  console.log('Meta',meta.current_page)
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h1> Users </h1>
        <Link to="/users/new" className='btn-add'>Add new</Link>
      </div>
      <div className='card animated fadeInDown'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Create Date</th>
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
                {users.map( u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.created_at}</td>
                    <td>
                      <Link className="btn-edit" to={'/users/'+u.id}>Edit</Link>
                      &nbsp;
                      <button onClick={ev => onDelete(u)} className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            }            
          </table>  
          {console.log('page',page)}
          <Pagination count={meta.last_page} page={page} onChange={changePage} hideNextButton hidePrevButton />

      </div> 
    </div>
  )
}
