import { useContext, useEffect, useState } from 'react'
import {AuthContext} from "../context/AuthContext"
import Male from "../img/male.jpeg"
import Female from "../img/female.jpeg"
import { CircularProgress } from '@mui/material'
import { ChatContext } from '../context/ChatContext'
import { IndexContext } from '../context/IndexContext'

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function Search() {
  const [username, setUsername] = useState("")
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false);
  const {currentUser}=useContext(AuthContext)
  const {setState}=useContext(IndexContext)
  const {setSecondUser,secondUser,chats}=useContext(ChatContext)
  useEffect(()=>{
     setUsername("")
     setUsers([])
  },[secondUser,chats])
  const handleSearch=async(e)=>{
    setUsername(e.target.value);
    if(e.target.value===""){
      setUsers([]);
      return;
    }
    setLoading(true);
    fetch(SERVER_URL + "/search?str="+e.target.value)
      .then((response) => {
        if (!response.ok) {
            throw new Error("");
        }
        return response.json();
      })
      .then((data) => {
        const items = [];
        data.forEach((item)=>{
          if(chats.has(item?.name) || item.name === currentUser.name)return;
             items.push(item);
        })
        setUsers(items);
      })
      .catch((e) => {
        console.log(e.message);
      })
      .finally(()=>{setLoading(false);})
  };
  const handleSelect=async(user)=>{
      setSecondUser({name: user.name, gender: user.gender });
      setUsers([user]);
      setState(true);
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder='Find new users' value={username} onChange={(e)=>handleSearch(e)}/>
      </div>
      {username && (!loading) && (users.length===0) && <span>No unknown user with this name!</span>}
      {users.map((user)=>{ 
        return(
        <div className='userChat' key={user.name} onClick={()=>{ return(handleSelect(user))}}>
        <img className="profileImg" src={user?.gender==="male"?Male:Female} alt=""/>
        <div className="userChatInfo">
          <span>{user?.name}</span>
        </div>
      </div>)})}
      {loading && <div className='my-5 flex-center'> <CircularProgress size={30}/> </div>}
    </div>
  )
}

export default Search