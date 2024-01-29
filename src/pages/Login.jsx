import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function Login(){
  const {currentUser,setCurrentUser} = useContext(AuthContext)
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    if(currentUser){
       navigate("/");
    }
  },[currentUser])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    setLoading(true);
    fetch(SERVER_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: username, password }),
    })
      .then((response) => {
        if (!response.ok) {
            throw new Error("Invalid Credentials");
        }
        return response.json();
      })
      .then((data) => {
        setCurrentUser(data);
        setMsg("User loggedin successfully");
      })
      .catch((e) => {
        console.log(e)
        setMsg(e.message);
      });
    setLoading(false);
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Leap Assessment</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          {loading ? (
            <div className="button">Login</div>
          ) : (
            <button>Login</button>
          )}
          {loading && (
            <div>
              <CircularProgress />
            </div>
          )}
          <span>{msg}</span>
        </form>
        <p>
          You don't have an account?<Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
