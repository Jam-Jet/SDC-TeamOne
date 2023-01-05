import React, { useState, useEffect, useContext } from "react";
import NavBar from "./components/live-chat-page/Navbar";
import LiveChatPage from "./components/live-chat-page/LiveChatPage";
import UsernameModal from "./components/live-chat-page/UsernameModal";

function App() {
  const [showUsernameModal, setShowUsernameModal] = useState(true);
  const [chatData, setChatData] = useState();
  const contextData = {
    showUsernameModal,
    setShowUsernameModal,
    chatData,
    setChatData,
  };

  return (
    <appContext.Provider value={{ ...contextData }}>
      <div className="App">
        <UsernameModal />
        <NavBar />
        <LiveChatPage />
      </div>
    </appContext.Provider>
  );
}

export const appContext = React.createContext();
export default App;
