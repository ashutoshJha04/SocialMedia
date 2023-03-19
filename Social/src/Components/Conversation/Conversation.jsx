import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./Conv.css";
function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("http://localhost:8800/api/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className='conversation'>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAANlBMVEWzs7P///+6urr7+/uwsLCtra3n5+fk5OTW1tbz8/Pu7u74+PjT09PExMS3t7fBwcHKysrd3d0p0CG8AAACLUlEQVRoge2Z25KDIAxAAYMXVMD//9nVXqbtWiB0E53O5rzvngmSC6lSgiAIgiAIf8UY4wHOEOtmHFwf1OFyr68My+GRD/pOG+yRbuj0AxfsYV7rnX6m9YeEDT6+ejcivxqgH3feI8KGMLzzrjQzqxr6hHdjYrxotsuIOdW2zYq17pnUdimIteb51jAXxVqzmO3bbPpFx6CGiBBr7RnM+8L1jp4haJRYO3Iv8rC1NuTmckpdIU8syJevB9Np5oW6jn2D+bTTJk/oL7hh/9FMPoWia9h5ZvLqaaeTzGBSc/butGlrGGoGu0E8EGEjvkRNqQ4VYtLKXXPY63FTfukqM2kV85hZ+04gFJdfVE+MtHe74ooRtwx0w9ADqVc9NmBF6DsGsm639K8biytj5E8Mte06EZBPJBuFJcmFgWc/BE35rJnMxeckacV+plTJGoaFwQ2TL98s1+tKPqkd5/oxuywJrItPn77fnGtPte16U2KOTdirOlFPyFvUjsQmcORLqBupWbDhFitIFROG7vhKekDgWDs+kaufrFmVb5RcG/3VGwrr3o7ld0KwpjwZjJHcDWrGjb0uEv44u/6nsOBfsWMXjSKwV2pvDO0U1j/9WA9g/dSWh68Ebonqk88O1s71we6C732dfA02Vrwes7gZf+qgyLQXsLkGfqp5pqNwmEEJIrl3A9FPzMd3OQtiLmUyt+VuImYxi1nMX20eGwZQuxvDAvtTUxAEQRCEr+YHcOUbbHrkSGcAAAAASUVORK5CYII=" className='convimg' alt="error" />
      <span className='convName'>{user?.username}</span>
    </div>
  )
}

export default Conversation
