import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import Male from "../img/male.jpeg"
import Female from "../img/female.jpeg"
function Message({ message, shouldDisplayDate }) {
  const [time, setTime] = useState('');
  const { currentUser } = useContext(AuthContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  useEffect(() => {
    const d = new Date(message.timestamp);
    const h = (d.getHours() < 10 ? '0' : '') + d.getHours();
    const m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    setTime(`${h}:${m}`);
  }, [message]);

  const Today = new Date().toLocaleDateString();
  
  return (
    <>
    {shouldDisplayDate && (
        <div className="messageDate">
          {new Date(message.timestamp)?.toLocaleDateString()===Today?"Today":new Date(message?.timestamp).toLocaleDateString()}
        </div>
      )}
    {message?.message && <div ref={ref} className={`message ${message?.sender === currentUser?.name ? 'owner' : ''}`}>
      <div className="messageInfo">
        <img src={message?.senderGender==="male"?Male:Female} alt="" />
        <span>{time}</span>
      </div>
      <div className="messageContent">
        <p>{message?.message}</p>
      </div>
    </div>}
    </>
  )
}

export default Message