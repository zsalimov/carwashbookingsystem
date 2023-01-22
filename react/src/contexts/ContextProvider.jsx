import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
    user : null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    setErrorMessage: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({
       
    });
    
    const [notification, _setNotification] = useState('');

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
           token,
           setUser,
           setToken,
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