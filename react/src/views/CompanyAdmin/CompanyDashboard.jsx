import { useStateContext } from '../../contexts/ContextProvider';



export default function CompanyDashboard() {
  const {user,setNotification} = useStateContext();
  console.log('Company Dashboard', user)
  return (
    <div>Company Dashboard            
          
      <div>1. Son 1 havta icinde benim sirkette kac yeni sign up var</div>
      <div>2. Son 1 hafta icinte benim sirkette kac yeni reservasion yapilmis</div>
      <div>3. Son 1 hafta icinde benim sirkette toplam ciro nekadar</div>     
    </div>
  
  )
}
