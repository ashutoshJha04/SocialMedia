 
import './App.css'
import Home from './Components/Home'
import Login from './Components/Login/Login'
import Profile from './Components/Profile/Profile'
import Register from './Components/register/Register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  

} from "react-router-dom";
import {Redirect} from "react-router-dom";
import React,{ createContext, useContext, useState }  from 'react'
import { Authcontext } from './COntext/Authcontext'
import Message from './Components/Message/Message'
export const UserContext = createContext();
function App() {
   const {user} = useContext(Authcontext);
   const [load, setload] = useState('false');

  return (
    <UserContext.Provider value={{ load, setload }}>
      <Router>
        <Switch>
        <Route exact path="/">
           {user ?  <Home /> : <Login/>}
          </Route>
          <Route path="/register">
            {user?<Redirect to="/"/>: <Register />}
          </Route>
          <Route path="/login">
          {user?<Redirect to="/"/>: <Login />}
          </Route>
          <Route path="/messages">
          {user?<Message/>: <Login />}
          </Route>
          <Route path="/profile/:Username">
            {user?<Profile/>: <Login/>}
          </Route>
        </Switch>
      </Router>
      </UserContext.Provider>
  )
}

export default App
