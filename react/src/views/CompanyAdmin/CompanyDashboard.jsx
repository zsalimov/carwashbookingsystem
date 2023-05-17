import Chart from '../../components/CompanyAdmin/chart/Chart';
import Info from '../../components/CompanyAdmin/info/Info';
import { useStateContext } from '../../contexts/ContextProvider';



export default function CompanyDashboard() {
 
  const {user,notification, setNotification} = useStateContext();
 
  return (
    <div>
      <div> <h1>Company Dashboard </h1></div>   
      <div>Companies turnover figures</div>   
    <Info /> 
    <Chart />         
      {notification && 
                <div className='notification'>
                    {notification}

                </div>
            }
            
    </div>
  
  )
}
