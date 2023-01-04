import React, { useState, useEffect, useContext } from "react";
import LiveChatPage from "./components/live-chat-page/LiveChatPage";

function App() {
  const [chatData, setChatData] = useState();
  const contextData = {
    chatData,
    setChatData,
  };

  return (
    <appContext.Provider value={{ ...contextData }}>
      <div className="App">
        <LiveChatPage />
      </div>
    </appContext.Provider>
  );
}

export const appContext = React.createContext();
export default App;
