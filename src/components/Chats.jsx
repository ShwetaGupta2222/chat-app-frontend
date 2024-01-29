import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { IndexContext } from '../context/IndexContext';
import Male from "../img/male.jpeg"
import Female from "../img/female.jpeg"
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function Chats() {
  const [size, setSize] = useState(window.innerWidth);
  const { currentUser } = useContext(AuthContext)
  const { state,setState } = useContext(IndexContext)
  const { chats,setChats,setSecondUser,secondUser} = useContext(ChatContext)
  const [ allfriends,setAllFriends] = useState([])

  useEffect(() => {
    const getChats = () => {
      fetch(SERVER_URL + "/getAllChats/"+ currentUser.name)
      .then(response => response.json())
      .then(data => {
            let Chats = new Map();
            Object.entries(data).map((item)=>{
               Chats.set(item[0],item[1]);
            })
            setChats(Chats);
        })
      .catch(error => console.error('Error fetching user messages:', error));
    };
    currentUser && getChats()
  }, [currentUser]);
  
  useEffect(()=>{
    const messageComponents = [];
    chats.forEach((value,key) => {
      const gender = value[0].sender===key?value[0].senderGender:value[0].receiverGender;
      messageComponents.push(
        <div className='userChat' key={key} onClick={()=>{setSecondUser({name:key,gender:gender}); setState(true);}}>
        <div className='image'><img src={gender==="male"?Male:Female} className="profileImg" alt=""/></div>
        <div className="userChatInfo">
          <span>{key}</span>
          <p>{value[value.length-1].message}</p>
        </div>
      </div>
      );
    });
    setAllFriends(messageComponents)
  },[chats])

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if ((size > 700) && (state === false)) { setState(true); }
  if ((size <= 700) && (secondUser.name === null)) {setState(false);}

  useEffect(() => {
    if ((size > 700) && (state === false)) { setState(true); }
    if ((size <= 700) && (secondUser.name === null)) {setState(false);}
  }, [size])

  return (
    <div className="chats">
      {/* ?.sort((a, b) => b[1].date - a[1].date). */}
      <div>{allfriends}</div>
    </div>  
  );
}

export default Chats