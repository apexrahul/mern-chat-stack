import React, { useState, useEffect } from "react";
import './contact.css'
import Logo from "../assets/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi"

export default function Contacts({ contacts, currentUser,changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [showHamMenu, setShowHamMenu] = useState(false);
  
  useEffect(() => {
    let didCancel = true;
    const  getData = async () => {
    const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
    }
       getData();

     return () => { didCancel = false}
  }, []);


  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  useEffect(() => {
    if(currentUser){
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }

  },[currentUser])

  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="contact-container">

          <div className="brand">
          <a className="hamburger-menu" href="#" onClick={ () => setShowHamMenu(!showHamMenu)}><GiHamburgerMenu /></a>
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
    
          <div className={ showHamMenu ? "mobile-icon-contact" : "contacts"}>
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={contact.avatarImage}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={ showHamMenu ? "mobile-icon-user" : "current-user"}>
            <div className="avatar">
              <img
                src={currentUserImage}
                alt="avatar"
              />
            </div>

            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
      </>
  );
}