import React, { useState, useEffect } from "react";
import LiveChatPage from "./components/live-chat-page/LiveChatPage";
import Login from "./components/log-in-page/Login";

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

  //Preloads initial chat data
  useEffect(() => {
    fetch("http://localhost:3003/last50messages")
      .then((res) => res.json())
      .then((data) => setChatData(data));
  }, []);

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
