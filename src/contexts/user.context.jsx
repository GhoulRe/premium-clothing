import { createContext, useState,useEffect } from "react";
import {onAuthStateChangedListener, createUserDocumentFromAuth} from '../utils/firebase.utils';

//actual value you want to access
export const userContext = createContext({
     //give default value not initial value
     currentUser: null,
     setCurrentUser: ()=> null,
})

//actual component
export const UserProvider = ({children}) => {

    const [currentUser,setCurrentUser]= useState(null);
    const value = {currentUser,setCurrentUser};

    // signOutUser();
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unsubscribe;
    },[])

  return  <userContext.Provider value={value}>{children}</userContext.Provider>
}

//empty object value should be null beacause empty object will evaluate true