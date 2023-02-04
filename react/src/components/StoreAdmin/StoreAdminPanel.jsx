import React from 'react'
import {Link} from 'react-router-dom'

export default function StoreAdminPanel() {
  return (
    <aside>
      <Link to="/store_dashboard">Dashboard</Link>
      <Link to="/washers">Washers</Link>     
    </aside>
  )
}
