import { useContext, useMemo } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
    user : null,
    users: null,    
    token: null,
    url:null,
    notification: null,
    errorMessage: null,
    setUrl: () => {},
    providerLogin: () => {},
    setUser: () => {},    
    setUsers: () => {},    
    setToken: () => {},
    setNotification: () => {},
    setErrorMessage: () => {}
})
    
export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const providerLogin = useMemo(() => ({user,setUser}), [user,setUser]) 
    const [users, setUsers] = useState([]);
    const [notification, _setNotification] = useState('');
    const [url, setUrl] = useState('');
    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification('');
        }, 5000)
    }
    const [errorMessage, _setErrorMessage] = useState('');

    const setErrorMessage = (message) => {
        _setErrorMessage(message);
        setTimeout(() => {
            _setErrorMessage('');
        }, 5000)
    }
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    
    const setToken = (token) => {
      
        _setToken(token)
        if (token) {            
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
       
    }

    return(
        <StateContext.Provider value={{
           user,
           users,
           url,         
           token,
           setUser, 
           setUsers,         
           setToken,
           setUrl,
           providerLogin,
           notification,
           errorMessage,
           setNotification,
           setErrorMessage
        }}>
             {children}
        </StateContext.Provider>
    )

}
export const useStateContext = () => useContext(StateContext)