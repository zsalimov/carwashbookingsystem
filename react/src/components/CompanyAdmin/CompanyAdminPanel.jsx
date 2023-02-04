import React from 'react'
import {Link} from 'react-router-dom'

export default function CompanyAdminPanel() {
  return (
    <aside>
      <Link to="/company_dashboard">Dashboard</Link>
      <Link to="/stores">Stores</Link>     
      <Link to="/company_users">Users</Link>     
    </aside>
  )
}
