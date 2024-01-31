import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { IndexContext } from "../context/IndexContext";
import Male from "../img/male.jpeg";
import Female from "../img/female.jpeg";
import { CircularProgress } from "@mui/material";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function Chats() {
  const { currentUser } = useContext(AuthContext);
  const { state, setState } = useContext(IndexContext);
  const { chats, setChats, setSecondUser, secondUser, friends, setFriends } =
    useContext(ChatContext);
  const [size, setSize] = useState(window.innerWidth);
  const [allfriends, setAllFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getChats = () => {
      fetch(SERVER_URL + "/getAllChats/" + currentUser.name)
        .then((response) => response.json())
        .then((data) => {
          let Chats = new Map();
          Object.entries(data).map((item) => {
            Chats.set(item[0], item[1]);
          });
          Chats?.forEach((value, key) => {
            value.sort((a, b) => a.timestamp - b.timestamp);
          });
          setChats(Chats);
        })
        .catch((error) => console.error("Error fetching user messages:", error))
        .finally(() => {
          setLoading(false);
        });
    };
    setLoading(true);
    currentUser && getChats();
  }, [currentUser]);

  useEffect(() => {
    const tempFriends = [];
    chats.forEach((value, key) => {
      if (value.length === 0) return;
      const tempObj = {};
      const gender =
        value[0].sender === key
          ? value[0].senderGender
          : value[0].receiverGender;
      tempObj.name = key;
      tempObj.gender = gender;
      tempObj.lastMsg = value[value.length - 1].message;
      tempObj.lastMsgTimestamp = value[value.length - 1].timestamp;
      tempFriends.push(tempObj);
    });
    setFriends(tempFriends);
  }, [chats]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (size > 700 && state === false) {
    setState(true);
  }
  if (size <= 700 && secondUser.name === null) {
    setState(false);
  }

  useEffect(() => {
    if (size > 700 && state === false) {
      setState(true);
    }
    if (size <= 700 && secondUser.name === null) {
      setState(false);
    }
  }, [size]);

  return (
    <div className="chats">
      {loading ? (
        <div className="flex-center h-70">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          {friends
            .sort(
              (a, b) =>
                new Date(b.lastMsgTimestamp) - new Date(a.lastMsgTimestamp)
            )
            .map((item) => (
              <div
                className="userChat"
                key={item.name}
                onClick={() => {
                  setSecondUser({ name: item.name, gender: item.gender });
                  setState(true);
                }}
              >
                <img
                  src={item.gender === "male" ? Male : Female}
                  className="profileImg image"
                  alt=""
                />
                <div className="userChatInfo">
                  <span>{item.name}</span>
                  <p>
                    {item.lastMsg.substr(0, 26)}
                    <span>{item.lastMsg.length > 26 && "..."}</span>
                  </p>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default Chats;
