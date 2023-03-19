import Leftbar from "../Leftbar/Leftbar";
import "../Profile/profile.css";
import Topbar from "../topbar/Topbar";
import Feed from "../feed/Feed";
import Rightbar from "../rightsidebar/Rightbar";
import pic1 from "../../assets/profile.png";
import pic2 from "../../assets/cover.jpg";
import { useState,useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Authcontext } from "../../COntext/Authcontext";

export default function Profile() {
  const [user,setUser] = useState({});
  const username = useParams().Username;
  

  useEffect(()=>{
    const fetch = async()=>{
  
      const usr = await axios.get(`http://localhost:8800/api/users?username=${username}`);
      
      setUser(usr.data);
      
      
    }
    fetch();
    
  
  },[username])
  return (
    <div>
      <Topbar/>
      <div className="profile">
        <Leftbar/>
        <div className="profileright">
          <div className="profilerighttop">
            <div className="profilecover">

            <img src={user.coverPicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9nP4ZvgSA8SHY9WqVdmdacMMe-BqJJO4MmA&usqp=CAU"} className="bgcover" alt="error" />
            <img className="profilepic" src={user.profilePicture || "data:image/jpeg;base64,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" } alt="error" />
            </div>
            <div className="profileinfo">
            <h4 className="profileinfoname">{user.username}</h4>
            <span className="profileinfodesc">{user.desc}</span>
          </div>
          </div>
          
          <div className="profilerightbottom">
            <Feed username={username}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>

    </div>
  )
}
