import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";
import "./welcome.css"

export default function Welcome() {
  

  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function getData(){
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }
  getData();
  }, []);

  // console.log( JSON.parse(
  //   localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  // )._id)

  return (
    <div className="welcome-container">
      <img className="robot-image" src={Robot} alt="robot" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}
