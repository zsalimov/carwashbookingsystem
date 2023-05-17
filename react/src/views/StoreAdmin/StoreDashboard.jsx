import React, { useState } from 'react'
import Chart from '../../components/CompanyAdmin/chart/Chart'
import Info from '../../components/CompanyAdmin/info/Info'
import TableText from '../../components/helper/TableText'

export default function StoreDashboard() {

  return (
    <div>
      <div><h1>Store Dashboard</h1></div>
      <span><h2>Revenue, Costs and Sales figures</h2></span>
      <Info />
      <span><h2>Monthly Sales figures</h2></span>
      <Chart />
    </div>
  )
}
