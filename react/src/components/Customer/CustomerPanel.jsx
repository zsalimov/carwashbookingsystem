import { BookOnline, CarRental, Dashboard } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

function CustomerPanel() {
  return (
    <div className='sidePanel'>
      <div className="sideWrapper">
        <ul className="sideList">
          <li className="sideListItem">
            <Link to="/dashboard"><Dashboard />Dashboard</Link>
          </li>
          <li className="sideListItem">
            <Link to="/reservations"><BookOnline />Reservations</Link>
          </li>
          <li className="sideListItem">
            <Link to="/myvehicles"><CarRental />My Vehicles</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CustomerPanel