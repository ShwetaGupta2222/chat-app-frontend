import React, { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import Cross from "../img/cross.webp";
import { CircularProgress } from "@mui/material";
import DeleteContext from "../context/DeleteContext";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const ClearAllChats = ({ handleClearAllChats }) => {
  const { chats, setChats, secondUser } = useContext(ChatContext);
  const {
    setClearSelectedChats,
    setNotificationMessage,
    deleteChats,
    setDeleteChats,
  } = useContext(DeleteContext);
  const [leaveAnimation, setLeaveAnimation] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAll = (e, msg) => {
    setLoading(false);
    setDeleteChats(new Map());
    setClearSelectedChats(false);
    handleClearAllChats(false);
    setLeaveAnimation(!leaveAnimation);
    setTimeout(() => {
      handleClearAllChats();
    }, 200);
    if (typeof msg === String) setNotificationMessage(msg);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const chatIds = [];
    deleteChats.forEach((value, key) => {
      if (value === true) chatIds.push(key);
    });

    setLoading(true);
    fetch(SERVER_URL + "/deleteAllChats", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(chatIds),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("");
        }
        return;
      })
      .then(() => {
        if (chatIds.length === chats.get(secondUser.name)?.length) {
          chats.delete(secondUser.name);
          setChats(new Map(chats));
        } else {
          let newChats = [];
          chats.get(secondUser.name)?.forEach((item) => {
            if (deleteChats.get(item.timestamp)) return;
            newChats.push(item);
          });
          chats.set(secondUser.name, newChats);
          setChats(new Map(chats));
        }
        setNotificationMessage(
          "Message deleted successfully. Goodbye, old messages!"
        );
      })
      .catch((e) => {
        console.log(e);
        setNotificationMessage(
          "Oops! Something went wrong. Unable to delete the message"
        );
      })
      .finally(() => {
        handleAll("");
      });
  };

  return (
    <>
      <div className="block-background" onClick={handleAll}></div>
      <div
        className={`change-profile ${
          leaveAnimation ? "display" : ""
        } delete-account`}
      >
        <img className="cross" src={Cross} alt="" onClick={handleAll} />
        <form onSubmit={handleClick}>
          <span className="span">
            {loading
              ? "Please wait a moment"
              : "Do You really want to clear the chat?"}
          </span>
          {loading ? (
            <div className="my-5">
              <CircularProgress />
            </div>
          ) : (
            <button>Clear Chat</button>
          )}
        </form>
      </div>
    </>
  );
};

export default ClearAllChats;
