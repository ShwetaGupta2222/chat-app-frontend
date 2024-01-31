import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import { Message } from "./";
import { IndexContext } from "../context/IndexContext";
import DeleteContext from "../context/DeleteContext";

function Messages() {
  const { chats, secondUser } = useContext(ChatContext);
  const { state } = useContext(IndexContext);
  const { notificationMessage } = useContext(DeleteContext);
  const scrollContainerRef = useRef();
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    scrollContainerRef.current.scrollTop =
      scrollContainerRef.current.scrollHeight;
    scrollContainer.style.scrollBehavior = "smooth";
  }, [chats.get(secondUser.name), state]);

  useEffect(() => {
    scrollContainerRef.current.scrollTop =
      scrollContainerRef.current.scrollHeight;
  }, [secondUser]);
  const shouldDisplayDate = (index) => {
    if (index === 0) {
      return true;
    }
    const prevDate = new Date(
      chats.get(secondUser.name)[index - 1].timestamp
    ).toLocaleDateString();
    const currDate = new Date(
      chats.get(secondUser.name)[index].timestamp
    ).toLocaleDateString();
    return prevDate !== currDate;
  };

  return (
    <div ref={scrollContainerRef} className="messages">
      {secondUser.name === null ? (
        <span className="span">Start a new conversation here..</span>
      ) : (
        chats.get(secondUser.name) &&
        chats
          .get(secondUser.name)
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
          .map((chatMessage, i) => {
            return (
              <Message
                key={chatMessage.timestamp}
                message={chatMessage}
                shouldDisplayDate={shouldDisplayDate(i)}
              />
            );
          })
      )}
      {notificationMessage && (
        <div className="notification">{notificationMessage}</div>
      )}
    </div>
  );
}

export default Messages;
