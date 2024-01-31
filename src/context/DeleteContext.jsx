import React, { createContext, useContext, useEffect, useState } from "react";
import { ChatContext } from "./ChatContext";
import { AuthContext } from "./AuthContext";

export const DeleteContext = createContext();
export const DeleteContextProvider = ({ children }) => {
  const { secondUser, chats } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [notificationMessage, setNotificationMessag] = useState("");
  const [deleteChats, setDeleteChats] = useState(new Map());
  const [clearSelectedChats, setClearSelectedChats] = useState(false);

  const setNotificationMessage = (msg) => {
    setNotificationMessag(msg);
    setTimeout(() => {
      setNotificationMessag("");
    }, 2000);
  };

  useEffect(() => {
    let map = new Map();
    chats.get(secondUser.name)?.forEach((item) => {
      map.set(item.timestamp, false);
    });
    setDeleteChats(map);
    setClearSelectedChats(false);
  }, [secondUser, chats, currentUser]);
  return (
    <DeleteContext.Provider
      value={{
        notificationMessage,
        setNotificationMessage,
        deleteChats,
        setDeleteChats,
        clearSelectedChats,
        setClearSelectedChats,
      }}
    >
      {children}
    </DeleteContext.Provider>
  );
};

export default DeleteContext;
