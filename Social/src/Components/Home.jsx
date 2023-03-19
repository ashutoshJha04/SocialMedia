import React, { createContext, useContext, useState } from "react";
import Feed from "./feed/feed";
import Leftbar from "./Leftbar/Leftbar";
import Rightbar from "./rightsidebar/Rightbar";
import Topbar from "./topbar/Topbar";
import './home.css'




function Home() {
  
 
  return (
    
    <div>
      <Topbar />
      <div className="bar">

        
        <Leftbar  />
        <Feed  />
        <Rightbar  />
      </div>
    </div>
    
  );
}

export default Home;
