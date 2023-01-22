import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import SidePanel from './SidePanel'


export default function DeafaultLayout() {
    

  return (
    <div id="defaultLayout">
           <SidePanel />
        <div className='content'>
            <Header />
            <main>
            <Outlet/>
            </main>
        </div>
      
       
    </div>
  )
}
