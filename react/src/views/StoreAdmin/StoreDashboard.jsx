import React, {useState} from 'react'
import Chart from '../../components/CompanyAdmin/chart/Chart'
import Info from '../../components/CompanyAdmin/info/Info'
import TableText from '../../components/helper/TableText'

export default function StoreDashboard() {
 
  return (
    <div>          
           <div><h1>Menu</h1></div> 
      <div><h1>Store Dashboard</h1></div>
      <div>1. Son 1 havta icinde benim magzalarda/washerlarda kac yeni sign up var</div>
      <div>2. Son 1 hafta icinte benim magzalarda/washerlarda kac yeni reservasion yapilmis</div>
      <div>3. Son 1 hafta icinde benim magzalarda/washerlarda toplam ciro nekadar</div>  
            
      <div> 1. Washerin Reservasion CRUD (post process ve service type, promosion)</div>

     <Info />    
      <Chart /> 
     
         
    </div>
  )
}
