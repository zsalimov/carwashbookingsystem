import { Dashboard, PeopleAlt, Factory } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'


export default function SiteAdminPanel() {
  return (
    <div className='sidePanel'>
      <div className="sideWrapper">
        <ul className="sideList">
          <li className="sideListItem">
            <Link to="/site_dashboard"><Dashboard />Dashboard</Link>
          </li>
          <li className="sideListItem">
          <Link to="/users"><PeopleAlt />Users</Link>
          </li>
          <li className="sideListItem">
          <Link to="/companies"><Factory />Companies</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
