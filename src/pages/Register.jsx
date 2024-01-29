import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function Register() {
  const {currentUser,setCurrentUser} = useContext(AuthContext)
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
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
    const user = {name: username, password, gender:selectedGender}
    setLoading(true);
    fetch(SERVER_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorData) => {
            throw new Error(errorData);
          });
        }
        return response.text();
      })
      .then((data) => {
        setCurrentUser(user);
        setMsg(data);
      })
      .catch((e) => {
        setMsg(e.message);
      });
    setLoading(false);
  };
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Leap Assessment</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" required placeholder="Username" />
          <input type="password" required placeholder="Password" />
          <span>Gender</span>
          <div className="gender">
          <label>
            <input type="radio" required name="gender" value="male"  checked={selectedGender === 'male'} onChange={handleGenderChange}/>
            Male
          </label>
          <label>
            <input type="radio" required name="gender" value="female" checked={selectedGender === 'female'} onChange={handleGenderChange}/>
            Female
          </label>
          </div>

          {loading ? (
            <div className="button">Sign Up</div>
          ) : (
            <button>Sign Up</button>
          )}
          {loading && (
            <div>
              <CircularProgress />
            </div>
          )}
          <span>{msg}</span>
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
