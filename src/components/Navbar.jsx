import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import More from "../img/more.png";
import Cross from "../img/cross.webp";
import Male from "../img/male.jpeg";
import Female from "../img/female.jpeg";
import { CircularProgress } from "@mui/material";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const ChangePassword = ({ handleCross }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldP: "",
    newP: "",
    confirmNewP: "",
  });

  const handleChange = (event) => {
    setIsChanged(false);
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsChanged(false);
    setLoading(true);
    setMessage("");
    const oldP = e.target[0].value;
    const newP = e.target[1].value;
    const confirmNewP = e.target[2].value;
    if (oldP !== currentUser.password) {
      setMessage("Invalid Old Password!");
      setLoading(false);
      return;
    }
    if (newP !== confirmNewP) {
      setMessage("New Password and Confirm Password should match!");
      setLoading(false);
      return;
    }
    fetch(
      SERVER_URL +
        "/changePassword?newPassword=" +
        newP +
        "&username=" +
        currentUser.name
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("");
        }
        return response.text();
      })
      .then((data) => {
        setMessage("Password Changed Successfully!");
        setIsChanged(true);
        setTimeout(() => {
          setCurrentUser({ ...currentUser, password: newP });
        }, 2000);
      })
      .catch((e) => {
        setMessage("Password could not changed!");
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClick = () => {
    setDisplay(!display);
    setTimeout(() => {
      handleCross();
    }, 200);
  };
  return (
    <>
      <div className="block-background" onClick={handleClick}></div>
      <div
        className={`change-profile ${display ? "display" : ""} change-password`}
      >
        <img
          className="cross"
          src={Cross}
          alt=""
          onClick={() => {
            setDisplay(!display);
            setTimeout(() => {
              handleCross();
            }, 200);
          }}
        />
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            required
            placeholder="Old Password..."
            name="oldP"
            value={formData.oldP}
            onChange={handleChange}
          />
          <input
            type="password"
            required
            placeholder="New Password..."
            name="newP"
            value={formData.newP}
            onChange={handleChange}
          />
          <input
            type="password"
            required
            placeholder="Confirm New Password..."
            name="confirmNewP"
            value={formData.confirmNewP}
            onChange={handleChange}
          />
          {message && <span style={{ color: "black" }}>{message}</span>}
          {loading ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            <button
              style={{ backgroundColor: isChanged ? "green" : "#7b96ec" }}
            >
              {isChanged ? "Changed" : "Save Changes"}
            </button>
          )}
        </form>
      </div>
    </>
  );
};
function Navbar() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [dropdownHover, setDropdownHover] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);

  const handleCross = () => {
    setIsChangePassword(false);
  };

  const handleClick = () => {
    setDropdownHover(!dropdownHover);
  };
  const changePassword = () => {
    setIsChangePassword(!isChangePassword);
    setDropdownHover(!dropdownHover);
  };

  const handleLogOutClick = () => {
    setCurrentUser(null);
  };
  return (
    <div className="navbar">
      <span className="logo">{currentUser?.name}</span>
      <div className="user">
        <img
          className="image"
          src={currentUser?.gender === "male" ? Male : Female}
          alt="img"
        />
        <span>{currentUser?.displayName}</span>
        <button onClick={handleLogOutClick}>logout</button>
        <img className="more" src={More} onClick={handleClick} alt="" />
      </div>
      <div
        className={`dropdown ${
          dropdownHover ? "dropdown-hover" : "dropdown-leave"
        }`}
      >
        <div onClick={changePassword}>Change Password</div>
      </div>
      {isChangePassword && <ChangePassword handleCross={handleCross} />}
    </div>
  );
}

export default Navbar;
