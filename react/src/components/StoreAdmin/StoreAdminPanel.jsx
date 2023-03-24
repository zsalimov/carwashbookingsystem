import { Dashboard, LocalCarWash } from '@mui/icons-material'
import React from 'react'
import {Link} from 'react-router-dom'

export default function StoreAdminPanel() {
  return (
    <div className='sidePanel'>
      <div className="sideWrapper">
        <ul className="sideList">
          <li className="sideListItem">
            <Link to="/store_dashboard"><Dashboard />Dashboard</Link>
          </li>
          <li className="sideListItem">
          <Link to="/washers"><LocalCarWash />Washers</Link>
          </li>          
        </ul>
      </div>
    </div>   
  )
}
