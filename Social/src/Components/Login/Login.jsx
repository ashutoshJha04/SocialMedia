import { useContext, useRef } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls";
import { Authcontext } from "../../COntext/Authcontext";
import {useHistory} from "react-router"

export default function Login() {
  const email = useRef();
  const history = useHistory();
  const password = useRef();
  const {user,isFetching,error,dispatch}=useContext(Authcontext);
  const handleclick = (e)=>{
    e.preventDefault();
    loginCall({
      email:email.current.value,password:password.current.value
    },dispatch);
  }
  const log_click = (e)=>{
    e.preventDefault();
    history.push("/register");
  }
  console.log(user);
  return (
    <div className="login">
      <div className="loginwrapper">
        <div className="loginleft">
            <h3 className="loginlogo">DIGISOCIAL</h3>
            <span className="logindesc">
                Connect with freinds and the world around you on Digisocial
            </span>
        </div>
        <form className="loginright" onSubmit={handleclick}>
            <div className="loginbox">
                <input type="email" required placeholder="Email" ref={email} className="logininput" />
                <input type="password" required placeholder="Password" minLength={6} ref={password} className="logininput" />
                <button className="loginbutton">{isFetching?"Loading...":"Log-in"}</button>
                <span className="loginforgot">Forgot password?</span>
                <button className="loginregistration" onClick={log_click}>Create new account</button>
            </div>
        </form>
      </div>
    </div>
  )
}
