import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { over } from "stompjs";
import SockJS from "sockjs-client";
export const ChatContext = createContext();

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [secondUser, setSecondUser] = useState({ name: null, gender: null });
  const [chats, setChats] = useState(new Map());
  const [stomp, setStomp] = useState(null);

  useEffect(() => {
    console.log(secondUser);
  }, [secondUser]);

  useEffect(() => {
    if (stomp) {
      stomp.connect({}, onConnected, onError);
    }
  }, [stomp]);

  const connect = () => {
    let Sock = new SockJS(SERVER_URL + "/ws");
    const stompp = over(Sock);
    setStomp(stompp);
  };

  useEffect(() => {
    if (currentUser) {
      connect();
    }
  }, [currentUser]);

  const onConnected = () => {
    stomp.subscribe(
      "/user/" + currentUser.name + "/private",
      onMessageRecieved
    );
  };

  const onError = (error) => {
    console.log(error);
  };

  const userJoin = (chatMessage, sender) => {
    addData(chatMessage, sender);
    stomp.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageRecieved = (payload) => {
    let payloadData = JSON.parse(payload.body);
    addData(payloadData, payloadData.sender);
  };

  const addData = (payloadData, sender) => {
    if (payloadData.sender === payloadData.receiver) {
      return;
    }
    if (payloadData.sender === currentUser.name) {
      fetch(SERVER_URL + "/addMessage", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payloadData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("");
          }
          return response.json();
        })
        .catch((e) => {
          console.log(e);
        });
    }

    setChats((prevChats) => {
      const updatedChatArray = [...(prevChats.get(sender) || []), payloadData];
      prevChats.set(sender, updatedChatArray);
      return new Map(prevChats);
    });
  };

  const sendMessage = (message) => {
    if (stomp === null) {
      return;
    }
    var chatMessage = {
      sender: currentUser.name,
      receiver: secondUser.name,
      senderGender: currentUser.gender,
      receiverGender: secondUser.gender,
      message,
      timestamp: new Date(),
    };
    if (secondUser.name != null) userJoin(chatMessage, secondUser.name);
  };
  return (
    <ChatContext.Provider
      value={{
        secondUser,
        setSecondUser,
        connect,
        chats,
        setChats,
        sendMessage,
        friends,
        setFriends,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
