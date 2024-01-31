import React, { useContext, useState } from "react";
import Arrow from "../img/arrow.png";
import { Messages, Input } from "./";
import { ChatContext } from "../context/ChatContext";
import { IndexContext } from "../context/IndexContext";
import Male from "../img/male.jpeg";
import Female from "../img/female.jpeg";
import More from "../img/more.png";
import ClearAllChats from "./ClearAllChats";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteContext from "../context/DeleteContext";

const Chat = () => {
  const { secondUser, chats } = useContext(ChatContext);
  const { state, setState } = useContext(IndexContext);
  const {
    setNotificationMessage,
    clearSelectedChats,
    setClearSelectedChats,
    deleteChats,
    setDeleteChats,
  } = useContext(DeleteContext);
  const [dropdownHover, setDropdownHover] = useState(false);
  const [clearAllChats, setClearAllChats] = useState(false);

  const handleArrowClick = () => {
    setState(false);
  };
  const handleMoreClick = () => {
    setDropdownHover(!dropdownHover);
  };
  const handleClearAllChats = () => {
    setDropdownHover(false);
    chats.get(secondUser.name)?.forEach((item) => {
      deleteChats.set(item.timestamp, true);
    });
    setClearAllChats(!clearAllChats);
  };
  const handleClearSelectedChats = () => {
    let temp = 0;
    deleteChats.forEach((key, value) => {
      temp = temp | key;
    });
    if (temp === false) {
      setNotificationMessage("No message to Delete");
    } else {
      setClearSelectedChats(!clearSelectedChats);
    }
    setDropdownHover(false);
  };
  const handleCross = () => {
    setClearSelectedChats(false);
    setDeleteChats(new Map());
  };
  const handleDelete = () => {
    setClearAllChats(true);
  };

  return (
    <>
      {state && (
        <div className="chat">
          <div className="chatInfo">
            {secondUser?.name && (
              <>
                {clearSelectedChats ? (
                  <div className="userInfo text-2xl">
                    <ClearIcon onClick={handleCross} fontSize="large" />
                  </div>
                ) : (
                  <div className="userInfo">
                    <img
                      className="img"
                      src={Arrow}
                      alt=""
                      onClick={handleArrowClick}
                    />
                    <img
                      className="profileImg"
                      src={secondUser?.gender === "male" ? Male : Female}
                      alt=""
                    />
                    <span>{secondUser.name}</span>
                  </div>
                )}
                {clearSelectedChats ? (
                  <div className="userInfo text-2xl red">
                    <DeleteIcon onClick={handleDelete} fontSize="large" />
                  </div>
                ) : (
                  <div className="userInfo">
                    <img
                      className="more w-20"
                      src={More}
                      onClick={handleMoreClick}
                      alt=""
                    />
                    <div
                      className={`dropdown chat-dropdown ${
                        dropdownHover ? "dropdown-hover" : "dropdown-leave"
                      }`}
                    >
                      <div onClick={handleClearSelectedChats}>
                        Clear selected chats
                      </div>
                      <div onClick={handleClearAllChats}>Clear all chats</div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <Messages />
          {secondUser.name && <Input />}
          {secondUser.name === null && <div className="empty" />}
          {clearAllChats && (
            <ClearAllChats handleClearAllChats={handleClearAllChats} />
          )}
        </div>
      )}
    </>
  );
};

export default Chat;
