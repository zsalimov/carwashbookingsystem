import React from 'react'
import { Link } from 'react-router-dom'
import { Dashboard, PeopleAlt, Factory, AdminPanelSettings } from '@mui/icons-material'


export default function CompanyAdminPanel() {
  return (
    <div className='sidePanel'>
      <div className="sideWrapper">
        <ul className="sideList">
          <li className="sideListItem">
            <Link to="/company_dashboard"><Dashboard />Dashboard</Link>
          </li>
          <li className="sideListItem">
            <Link to="/stores"><Factory />Stores</Link>
          </li>
          <li className="sideListItem">
            <Link to="/company_users"><AdminPanelSettings />Store Admins</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
