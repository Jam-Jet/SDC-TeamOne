import UserChatBlurb from "./UserChatBlurb";
import RecipientChatBlurb from "./RecipientChatBlurb";
import Button from "react-bootstrap/Button";
import UsernameModal from "./UsernameModal";
import NavBar from "./Navbar";
import { useContext, useEffect, useRef } from "react";
import { appContext } from "../../App";

const LiveChatPage = () => {
  const { setCurrentMessage, currentMessage, chatData, currentUserData } =
    useContext(appContext);

  const currentTime = new Date();
  const scrollTarget = useRef();

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
        .then(console.log(`message sent: ${currentMessage}`))
        .then(setCurrentMessage(""))
        .then((document.getElementById("chat-input").value = ""));
    }
  };

  //Auto-scrolls to bottom of chat when sending or receiving messages
  useEffect(() => {
    scrollTarget.current.scrollIntoView({ behavior: "smooth" });
  }, [chatData.length]);

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
            {chatData.map((message, i, arr) => {
              // Maps only the last 100 messages from chat data
              if (i >= arr.length - 100) {
                if (message.username === currentUserData.username) {
                  return (
                    <UserChatBlurb
                      message={message.message}
                      send_date={message.send_date}
                      username={message.username}
                    />
                  );
                } else {
                  {
                    {
                      return (
                        <RecipientChatBlurb
                          message={message.message}
                          send_date={message.send_date}
                          username={message.username}
                        />
                      );
                    }
                  }
                }
              }
            })}
            <div ref={scrollTarget}></div>
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
