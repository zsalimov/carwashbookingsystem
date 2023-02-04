import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, setNotification } = useStateContext();

console.log(user)
  useEffect(() => {
    getStores();
  }, [])


  const getStores = () => {
    setLoading(true)
    axiosClient.get('/stores')
      .then(({ data }) => {
        setLoading(false)
        setStores(data)
        console.log('store', data)

      })
      .catch(() => {
        setLoading(false)
      })
  }
  const onDelete = (s) => {
    if (!window.confirm(`Are you sure you want to delete ${s.sName}?`)) {
      return
    }
    axiosClient.delete(`/stores/${s.sId}`)
      .then(() => {
        setNotification("Store was successfully deleted!")
        getStores()
      })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/*inline styling */}
        <h1> Stores </h1>
        <Link to="/stores/new" className='btn-add'>Add new</Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <tr>
              <th>Store ID</th>
              <th>Store Campany ID</th>
              <th>Store Name</th>
              <th>Assigned User Name</th>
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
              {stores.map(s => (
                <tr key={s.sId}>
                  <td>{s.sId}</td>
                  <td>{s.cName}</td>
                  <td>{s.sName}</td>
                  <td>{s.Name}</td>
                  <td>
                    <Link className="btn-edit" to={'/stores/' + s.sId}>Edit</Link>
                    &nbsp;
                    <button onClick={ev => onDelete(s)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
