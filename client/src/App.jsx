import React, { useState, useEffect, useContext } from "react";
import NavBar from "./components/live-chat-page/Navbar";
import LiveChatPage from "./components/live-chat-page/LiveChatPage";
import UsernameModal from "./components/live-chat-page/UsernameModal";
import Login from "./components/log-in-page/Login";
import NavBarLogin from "./components/log-in-page/NavbarLogin";

function App() {
  const [continueAsGuest, setContinueAsGuest] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const [showUsernameModal, setShowUsernameModal] = useState(true);
  const [chatData, setChatData] = useState();
  const contextData = {
    continueAsGuest,
    setContinueAsGuest,
    currentUsername,
    setCurrentUsername,
    showUsernameModal,
    setShowUsernameModal,
    chatData,
    setChatData,
  };

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
