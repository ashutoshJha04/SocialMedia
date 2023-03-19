import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Authcontext } from '../../COntext/Authcontext';
import Chatbox from '../Chatbox/Chatbox';
import Chatonline from '../chatonline/Chatonline';
import Conversation from '../Conversation/Conversation';
import Topbar from '../topbar/Topbar';
import "./msg.css";
import { io } from "socket.io-client"
function Message() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  // const [socket,setSocket] = useState(null)

  const { user } = useContext(Authcontext);
  const scrollRef = useRef()

 

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);
  
  

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/conv/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/mess/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    }; 
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("http://localhost:8800/api/mess/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    < >
      <Topbar/>
      <div className='messenger'>
        <div className="chatmenu">
            <div className="chatMenuWrapper">
                    <input type="search" placeholder="Search for freinds" name="Freinds" className='chatMenuInput'/>
                   {
                   conversations.map((c)=>(
                    <div onClick={() => setCurrentChat(c)}>
                    <Conversation conversation={c} currentUser={user} />
                  </div>
                   ))
                   }
                    
            </div>
        </div>
        <div className="chatBox">
            <div className="chatboxWrapper">
              {currentChat ?
              <>
                    <div className="chatboxTop">
                    {messages.map((m) => (
                    <div  ref={scrollRef}  >
                      <Chatbox message={m} own={m.senderId === user._id} />
                    </div>
                  ))}
                    </div>
                    <div className="chatboxBottom">
                      <textarea className='chatMessageInput' placeholder='write something......'  onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage} ></textarea>
                      <button className='chatSubmitbutton' onClick={handleSubmit}>Send</button>
                    </div></>:
                    <span className='noConversationText'>Open a conversation to start a chat</span>
                    }
            </div>
        </div>
        <div className="chatOnline">
            <div className="onlineWrapper">
                    <Chatonline/>
                    <Chatonline/>
                    <Chatonline/>
                    <Chatonline/>
            </div>
        </div>
      </div>
    </>
  )
}

export default Message

