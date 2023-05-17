import Chart from '../../components/CompanyAdmin/chart/Chart'
import Info from '../../components/CompanyAdmin/info/Info'

export default function SiteDashboard() {
  return (
    <div>

      <div><h1>Site Dashboard</h1></div>
      <span><h2>Revenue, Costs and Sales figures</h2></span>
      <Info />
      <span><h2>Monthly Sales figures</h2></span>
      <Chart />
    </div>
  )
}


