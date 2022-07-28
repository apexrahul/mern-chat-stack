import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import './chatInput.css'


const ChatInput = ({handleSendMsg}) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
  <div className="input-chat-container">
      <div className="button-container">
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)} >
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value) }
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;

