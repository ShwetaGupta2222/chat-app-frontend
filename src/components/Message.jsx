import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import Male from "../img/male.jpeg";
import Female from "../img/female.jpeg";
import DeleteContext from "../context/DeleteContext";
function Message({ message, shouldDisplayDate }) {
  const [time, setTime] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { deleteChats, setDeleteChats, clearSelectedChats } =
    useContext(DeleteContext);

  useEffect(() => {
    const d = new Date(message.timestamp);
    const h = (d.getHours() < 10 ? "0" : "") + d.getHours();
    const m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    setTime(`${h}:${m}`);
  }, []);

  const handleChecked = (e, id) => {
    deleteChats.set(message.timestamp, e.target.checked);
    setDeleteChats(new Map(deleteChats));
  };
  const Today = new Date().toLocaleDateString();
  return (
    <>
      {shouldDisplayDate && (
        <div className="messageDate">
          {new Date(message.timestamp)?.toLocaleDateString() === Today
            ? "Today"
            : new Date(message?.timestamp).toLocaleDateString()}
        </div>
      )}
      {message?.message && (
        <label for={message.timestamp}>
          <div
            className={`message ${
              message?.sender === currentUser?.name ? "owner" : ""
            }`}
          >
            <div class="myCheckbox">
              <input
                type="checkbox"
                id={message.timestamp}
                onClick={(e) => handleChecked(e, message.timestamp)}
              />
              <label for={message.timestamp}>
                {clearSelectedChats && (
                  <>
                    {deleteChats.get(message.timestamp) ? (
                      <CheckBoxRoundedIcon fontSize="25" />
                    ) : (
                      <CheckBoxOutlinedIcon fontSize="25" />
                    )}
                  </>
                )}
              </label>
            </div>
            <div className="messageInfo">
              <img
                src={message?.senderGender === "male" ? Male : Female}
                alt=""
              />
              <span>{time}</span>
            </div>
            <div className="messageContent">
              <p>{message?.message}</p>
            </div>
          </div>
        </label>
      )}
    </>
  );
}

export default Message;
