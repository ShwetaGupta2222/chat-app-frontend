import React, { useContext} from 'react'
import Arrow from '../img/arrow.png'
import {Messages,Input} from './'
import { ChatContext } from '../context/ChatContext'
import { IndexContext } from '../context/IndexContext'
import Male from "../img/male.jpeg"
import Female from "../img/female.jpeg"

const Chat=()=>{
  const {secondUser}= useContext(ChatContext)
  const {state,setState}= useContext(IndexContext)
  const handleClick = () =>{
    setState(false);
  }
  
  return(
    <>
    {state && <div className="chat">
          <div className="chatInfo">
            {secondUser?.name && <>
            <div className="userInfo">
            <img className="img" src={Arrow} alt="" onClick={handleClick}/>
            <img className="profileImg" src={secondUser?.gender==="male"?Male:Female} alt=""/>
            <span>{secondUser.name}</span>
            </div>
            </>}
          </div>
         <Messages/>
         <Input/>
    </div>}
    </>
  )
}

export default Chat