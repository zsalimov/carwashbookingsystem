import React from 'react'
import {Link} from 'react-router-dom'

function SidePanel() {
  return (
    <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>  
            <Link to="/companies">Companies</Link>  
            
            
    </aside>
  )
}

export default SidePanel