import React, { useContext, useState } from "react";
import Attach from "../img/attach.png";
import { ChatContext } from "../context/ChatContext";

function Input() {
  const [text, setText] = useState("");
  const { secondUser, sendMessage } = useContext(ChatContext);

  const handleSend = async () => {
    if (secondUser.name === null || text.length === 1) {
      console.log(text);
      return;
    }
    const msg = text;
    setText("");
    sendMessage(msg);
  };
  const handleKey = (e) => {
    e.code === "Enter" && text !== "" && handleSend() && setText("");
  };
  return (
    <div className="input">
      <textarea
        type="text"
        placeholder="Type something..."
        value={text}
        onKeyDown={handleKey}
        onChange={(e) => {
          setText(e.target.value);
        }}
        autoComplete="true"
      />
      <div className="send">
        <img src={Attach} alt="" />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Input;
