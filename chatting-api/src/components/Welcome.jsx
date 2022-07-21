import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  

  const [userName, setUserName] = useState("");

  useEffect(() => {
    let didCancel = false;
    async function getData(){
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }
  getData();
  return () =>{didCancel = true};
  }, []);

  // console.log( JSON.parse(
  //   localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  // )._id)

  return (
    <Container>
      <img src={Robot} alt="robot" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;