import Chart from '../../components/CompanyAdmin/chart/Chart';
import Info from '../../components/CompanyAdmin/info/Info';
import { useStateContext } from '../../contexts/ContextProvider';



export default function CompanyDashboard() {
 
  const {user,notification, setNotification} = useStateContext();
  console.log('Company Dashboard', user) 
   

   
  return (
    <div>
      <div> <h1>Company Dashboard </h1></div>   
    <Info /> 
    <Chart />       
          
      <div>1. Son 1 havta icinde benim sirkette kac yeni sign up var</div>
      <div>2. Son 1 hafta icinte benim sirkette kac yeni reservasion yapilmis</div>
      <div>3. Son 1 hafta icinde benim sirkette toplam ciro nekadar</div>   
      {notification && 
                <div className='notification'>
                    {notification}

                </div>
            }
            
    </div>
  
  )
}
