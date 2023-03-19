import { createContext, useEffect, useReducer } from "react";
import Authreducer from "./Authreducer";
const INITIAL_STATE = {
    user:JSON.parse(sessionStorage.getItem("user")) || null,
    // user : {
    //     _id: "63cf43f62cb8bb35012da4d4",
    //     username: "Ashutosh04Jha",
    //     email: "adityajha@gmail.com",
    //     profilePicture: "",
    //     coverPicture: "",
    //     followers: [
    //         "633966970247e31283c2c9d0"
    //     ],
    //     followings: [
    //         "633966970247e31283c2c9d0"
    //     ],
    //     isAdmin: false,
        
        
    //     Relationship: 2,
    //     city: "New york"
    // },
    isFetching : false,
    error : false,
 
};
export const Authcontext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({children})=>{
    const [state , dispatch] = useReducer(Authreducer,INITIAL_STATE);
    useEffect(()=>{
        sessionStorage.setItem("user", JSON.stringify(state.user))
      },[state.user])
    return (
        <Authcontext.Provider value={{user:state.user,isFetching:state.isFetching,error:state.error,dispatch}}>
                {children}
        </Authcontext.Provider>
    )
}