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
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatData, setChatData] = useState();
  const contextData = {
    continueAsGuest,
    setContinueAsGuest,
    showUsernameModal,
    setShowUsernameModal,
    currentUsername,
    setCurrentUsername,
    currentMessage,
    setCurrentMessage,
    chatData,
    setChatData,
  };

  console.log("currentUsername: ", currentUsername);
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
