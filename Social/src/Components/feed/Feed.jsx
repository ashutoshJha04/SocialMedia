import React, { useContext, useState } from 'react'
import Post from '../Post/Post.jsx'
import Share from '../Share/Share.jsx'
import './feed.css'
import LabelIcon from '@mui/icons-material/Label';
import { useEffect } from 'react';
import axios from 'axios';
import { Authcontext } from '../../COntext/Authcontext.jsx';
import { UserContext } from '../../App.jsx';

function Feed({username}) {
  const [Psts,setPsts] = useState([]);
  const {user} = useContext(Authcontext);
  const { load } = useContext(UserContext);
useEffect(()=>{
  const fetch = async()=>{

    const res = username ? await axios.get("http://localhost:8800/api/posts/profile/"+username) : await axios.get(`http://localhost:8800/api/posts/timeline/${user._id}`);
    
    setPsts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
    
  }
  fetch();
  

},[username,user._id,load])
  return (
    <div className='feed'>
      <div className="feedwrapper">
      
       {(!username || username === user.username) && <Share />}
        {Psts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}

export default Feed;
