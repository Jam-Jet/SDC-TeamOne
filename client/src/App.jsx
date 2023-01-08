import React, { useState, useEffect, useContext } from "react";
import NavBar from "./components/live-chat-page/Navbar";
import LiveChatPage from "./components/live-chat-page/LiveChatPage";
import UsernameModal from "./components/live-chat-page/UsernameModal";
import Login from "./components/log-in-page/Login";
import NavBarLogin from "./components/log-in-page/NavbarLogin";
import { Routes, Route } from "react-router-dom";

function App() {
  const [continueAsGuest, setContinueAsGuest] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(true);
  const [currentUserData, setCurrentUserData] = useState({});
  const [currentMessage, setCurrentMessage] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [chatData, setChatData] = useState();
  const [userList, setUserList] = useState();

  const contextData = {
    continueAsGuest,
    setContinueAsGuest,
    showUsernameModal,
    setShowUsernameModal,
    currentUserData,
    setCurrentUserData,
    currentMessage,
    setCurrentMessage,
    newUser,
    setNewUser,
    chatData,
    setChatData,
    userList,
    setUserList,
  };

  useEffect(() => {
    fetch("http://localhost:3003/users")
      .then((res) => res.json())
      .then((data) => setUserList(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3003/users")
      .then((res) => res.json())
      .then((data) => setUserList(data))
      .then(setNewUser(false));
  }, [newUser]);

  setTimeout(() => {
    fetch("http://localhost:3003/messages")
      .then((res) => res.json())
      .then((data) => setChatData(data));
  }, 500);

  console.log("chatData: ", chatData);
  console.log("currentUserData: ", currentUserData);
  console.log("currentUserData.user_id:", currentUserData.user_id);
  console.log("currentMessage: ", currentMessage);

  return (
    <appContext.Provider value={{ ...contextData }}>
      <div className="App">
        {continueAsGuest ? <LiveChatPage /> : <Login />}
      </div>
    </appContext.Provider>
  );
}

export const appContext = React.createContext();
export default App;
