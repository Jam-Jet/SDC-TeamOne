import UserChatBlurb from "./UserChatBlurb";
import RecipientChatBlurb from "./RecipientChatBlurb";
import Button from "react-bootstrap/Button";
import UsernameModal from "./UsernameModal";
import NavBar from "./Navbar";
import { useContext } from "react";
import { appContext } from "../../App";

const LiveChatPage = () => {
  const {
    setCurrentMessage,
    currentMessage,
    // setChangeMade,
    chatData,
    currentUserData,
  } = useContext(appContext);
  const currentTime = new Date();
  const recordMessage = (e) => {
    setCurrentMessage(e.target.value);
  };
  const submitMessage = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      let postObj = {
        message: currentMessage,
        send_date: currentTime,
        username: currentUserData.username,
      };
      fetch("http://localhost:3003/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postObj),
      })
        // .then(setChangeMade(true))
        .then(console.log(`message sent: ${currentMessage}`))
        .then(setCurrentMessage(""))
        .then((document.getElementById("chat-input").value = ""));
    }
  };
  return (
    <div>
      <UsernameModal />
      <NavBar />
      <main>
        <div id="chat-header">
          <div id="header-line"></div>
          <span id="header-text">Start Chatting</span>
          <div id="header-line"></div>
        </div>
        <div id="chat-wrapper">
          <div id="chat-content">
            {chatData.map((message, i) => {
              if (message.username === currentUserData.username) {
                return (
                  <UserChatBlurb
                    message={message.message}
                    send_date={message.send_date}
                    username={message.username}
                  />
                );
              } else {
                return (
                  <RecipientChatBlurb
                    message={message.message}
                    send_date={message.send_date}
                    username={message.username}
                  />
                );
              }
            })}
            {/* <RecipientChatBlurb />
            <UserChatBlurb />
            <RecipientChatBlurb />
            <UserChatBlurb />
            <RecipientChatBlurb />
            <UserChatBlurb />
            <RecipientChatBlurb />
            <UserChatBlurb />
            <RecipientChatBlurb />
            <UserChatBlurb />
            <RecipientChatBlurb />
            <UserChatBlurb />
            <RecipientChatBlurb />
            <UserChatBlurb /> */}
          </div>
          <div id="input-and-btn-wrapper">
            <input
              id="chat-input"
              onChange={recordMessage}
              onKeyPress={submitMessage}
            ></input>
            <Button
              variant="success"
              id="send-chat-btn"
              onClick={submitMessage}
            >
              Send
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveChatPage;
