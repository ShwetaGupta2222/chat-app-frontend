import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Message } from "./";

function Messages() {
  const { chats, secondUser } = useContext(ChatContext);

  const shouldDisplayDate = (index) => {
    if (index === 0) {
      return true;
    }
    const prevDate = new Date(chats.get(secondUser.name)[index - 1].timestamp).toLocaleDateString();
    const currDate = new Date(chats.get(secondUser.name)[index].timestamp).toLocaleDateString();
    return prevDate !== currDate;
  };
  return (
    <div className="messages">
      {secondUser.name === null ? (
        <span className="span">Start a new conversation here..</span>
      ) : (
       
        
        chats.get(secondUser.name) && 
        chats.get(secondUser.name).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map((chatMessage,i) => {
          return (
            <Message
              key={chatMessage.id}
              message={chatMessage}
              shouldDisplayDate={shouldDisplayDate(i)}
            />
          );
        })

      )}
    </div>
  );
}

export default Messages;
