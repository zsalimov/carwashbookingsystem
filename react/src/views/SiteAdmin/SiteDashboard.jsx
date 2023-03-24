import Chart from '../../components/CompanyAdmin/chart/Chart'
import Info from '../../components/CompanyAdmin/info/Info'

export default function SiteDashboard() {
  return (
    <div>
      
      <div><h1>Site Dashboard</h1></div>
      <div>1. Son 1 havta icinde kac yeni sign up var</div>
      <div>2. Son 1 hafta icinte kac yeni reservasion yapilmis</div>
      <div>3. Son 1 hafta icinde toplam ciro nekadar</div>  
      <Info />  
      <Chart />       
             
    </div>
  )
}


 