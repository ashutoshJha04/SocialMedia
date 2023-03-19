import axios from "axios";
import { useContext, useRef } from "react";
import "./reg.css"
import {useHistory} from "react-router";
import { Authcontext } from "../../COntext/Authcontext";


export default function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const password_again = useRef();
  const history = useHistory();
  const log_click = (e)=>{
    e.preventDefault();
    history.push("/login");
  }
  const handleclick = async (e)=>{
    e.preventDefault();
    if (password.current.value !== password_again.current.value) {
      password.current.setCustomValidity("Passwords don't match");
    }else{
      const user = {
        username:username.current.value,
        password:password.current.value,
        email:email.current.value
      }
      try {
        await axios.post("http://localhost:8800/api/auths/register",user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
       
    }
  }
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
                <input type="email" placeholder="Email" ref={email} required className="logininput" />
                <input type="text" placeholder="Username" required ref={username} className="logininput" />
                <input type="password" placeholder="Password" required minLength={6} ref={password} className="logininput" />
                <input type="password" placeholder="Password again" required minLength={6} ref={password_again} className="logininput" />
                <button className="loginbutton" type="submit">Register</button>
                <span className="loginforgot">If you have already registered</span>
                <button className="loginregistration" onClick={log_click}>Sign-in</button>
            </div>
        </form>
      </div>
    </div>
  )
}
