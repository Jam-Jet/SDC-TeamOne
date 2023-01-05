import React, { useState, useEffect, useContext } from "react";
import NavBar from "./components/live-chat-page/Navbar";
import LiveChatPage from "./components/live-chat-page/LiveChatPage";
import UsernameModal from "./components/live-chat-page/UsernameModal";
import Login from "./components/live-chat-page/Login";
import NavBarLogin from "./components/live-chat-page/NavbarLogin";


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
        {/* <NavBar /> 
        <LiveChatPage /> */}
        <NavBarLogin />
        <Login />
      </div>
    </appContext.Provider>
  );
}

export const appContext = React.createContext();
export default App;
