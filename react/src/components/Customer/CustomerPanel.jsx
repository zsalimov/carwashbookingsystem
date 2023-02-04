import React from 'react'
import {Link} from 'react-router-dom'

function CustomerPanel() {
  return (
    <aside>
      <Link to="/dashboard">Dashboard</Link>            
      <Link to="/reservations">Reservations</Link>            
    </aside>
  )
}

export default CustomerPanel