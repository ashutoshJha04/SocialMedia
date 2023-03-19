import axios from "axios";
export const loginCall = async(usercredential,dispatch)=>{
    dispatch({type:"LOGIN_START"});
    try{
        const res = await axios.post("http://localhost:8800/api/auths/login",usercredential);
        dispatch({type:"LOGIN_SUCCESS",payload:res.data});

    }catch(err){
        dispatch({
            type:"LOGIN_FAILURE",payload:err
        });
    }
};