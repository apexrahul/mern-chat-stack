import React, { useState, useEffect, useRef } from "react";
import './chatContainer.css'
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, getAllMessagesRoute } from "../utils/APIRoutes";


export default function ChatContainer({ currentChat,socket}) {
 
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    let didCancel= true;
    const getCurrentChat = async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(getAllMessagesRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  };
  getCurrentChat();
   return  () =>{didCancel = false}
  }, [currentChat]);

  useEffect(() => {
    let didCancel= true;
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
     return  () =>{didCancel = false}
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={currentChat.avatarImage}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}
