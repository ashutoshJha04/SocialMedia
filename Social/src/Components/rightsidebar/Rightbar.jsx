import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import Online from '../Online/Online';
import { Authcontext } from '../../COntext/Authcontext';

import './rightbar.css'


function Rightbar({user}) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(Authcontext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("http://localhost:8800/api/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:8800/api/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
        
      } else {
        await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
        
      }
      setFollowed(!followed);
      window.location.reload();
    } catch (err) {
    }
  };

  const Homerightbar = ()=>{
    return (
      <>
      <div className="birthdayContainer">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwYFDshrV7uvr4ro1X2LFg-9hoi2ESvZ7xEg&usqp=CAU"  className='birthdayimg' alt="" />
          <span className='birthdaytext'><b>Pola Foster</b> and <b>3 others freinds</b> have a birthday today</span>
        </div>
        <img src="https://m.media-amazon.com/images/M/MV5BODg3NzI5OTg5M15BMl5BanBnXkFtZTgwNjc2MTYyNzE@._V1_FMjpg_UX1000_.jpg" className='rightbarAd' alt="" />
        <center><h4 className='rightbartitile'>Online Freinds</h4></center>
        <ul className='rightbarfreindlist'>
          {/* {
            user.map(u=>(
              <Online key={u.id} user={u}/>
            ))
          } */}
        
        </ul>
      </>
    )
  }

  const Profilebar = ()=>{
    return (
      <>
       {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? "-" : "+"}
          </button>
        )}
      <div className="border">
       <center><b>User Information</b></center>
       <br />
       <div className="rightbarinfo">
        <div className="rightbarinfoitem">
          <span className="rightbarinfokey">
            CITY :
          </span>
          <span className="rightbarinfovalue">
            {user.city}
          </span>
        </div>
        <div className="rightbarinfoitem">
          <span className="rightbarinfokey">
            FROM :
          </span>
          <span className="rightbarinfovalue">
           {user.city}
          </span>
        </div>
        <div className="rightbarinfoitem">
          <span className="rightbarinfokey">
            RELATIONSHIP :
          </span>
          <span className="rightbarinfovalue">
          {user.Relationship ==1? "Single":user.Relationship ==2?"Married":"~"}
          </span>
        </div>
        <div className="rightbarinfoitem">
          <span className="rightbarinfokey">
            BIO : 
          </span>
          <span className="rightbarinfovalue">
            Hello developers! I am here to provide you better UI/UX or backend guidelines.
          </span>
        </div>
       
       </div>
      </div>
      <br />
      <br />
      <div className="border">
        <br />
      <center><b>Followings</b></center><br />
          <div className="rightbarfollowings">
            {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
            <div className="rightbarfollowing">
              <img src={friend.profilePicture || "data:image/jpeg;base64,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"} className='rightbarfollowingimg' alt="error" />
              <div className="rightbarfollowinguser">
              {friend.username}
                </div>
            </div></Link>))}
           
              
          </div>
      </div>
     

      </>
    )
  } 

  return (
    <div className='rightbar'>
      <div className="rightbarwwrapper">
        {user?<Profilebar/>:<Homerightbar/>}
      </div>
    </div>
  )
}

export default Rightbar
