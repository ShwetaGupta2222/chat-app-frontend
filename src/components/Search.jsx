import { useContext, useState } from 'react'
import {AuthContext} from "../context/AuthContext"
import Male from "../img/male.jpeg"
import Female from "../img/female.jpeg"
import { CircularProgress } from '@mui/material'
import { ChatContext } from '../context/ChatContext'

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function Search() {
  const [username, setUsername] = useState("")
  const [users, setUsers] = useState([])
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false);
  const {currentUser}=useContext(AuthContext)
  const {setSecondUser,sendMessage,chats}=useContext(ChatContext)
  const handleSearch=async(e)=>{
    setUser(e.target.value);
    if(e.code==='enter' || true){
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
        setUsers(data);
      })
      .catch((e) => {
        console.log(e.message);
      });
    setLoading(false);
  } 
  };
  const handleSelect=async(user)=>{
      setSecondUser({name: user.name, gender: user.gender });
      setUser("");
      setUsers([user]);
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder='Find a user' value = {user}  onChange={handleSearch}/>
      </div>
      {username && (users.length===0) && <span>User not found!</span>}
      {users.map((user)=>{ 
        if(user.name===currentUser.name)return <></>;
        if(chats.has(user.name))return <></>;
        return(
        <div className='userChat' key={user.name} onClick={()=>{ setUser(user); return(handleSelect(user))}}>
        <img className="profileImg" src={user?.gender==="male"?Male:Female} alt=""/>
        <div className="userChatInfo">
          <span>{user?.name}</span>
        </div>
      </div>)})}
      {loading && <div> <CircularProgress /> </div>}
    </div>
  )
}

export default Search