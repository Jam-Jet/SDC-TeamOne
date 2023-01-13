import UserChatBlurb from "./UserChatBlurb";
import RecipientChatBlurb from "./RecipientChatBlurb";
import Button from "react-bootstrap/Button";
import UsernameModal from "./UsernameModal";
import NavBar from "./Navbar";
import { appContext } from "../../App";
import { useContext, useEffect, useRef } from "react";

const LiveChatPage = () => {
  const {
    setCurrentMessage,
    currentMessage,
    chatData,
    setChatData,
    currentUserData,
  } = useContext(appContext);

  const ws = useRef();
  const scrollTarget = useRef();
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
      ws.current.send(JSON.stringify(postObj));
      setCurrentMessage("");
      document.getElementById("chat-input").value = "";
    }
  };

  //Initialized websocket connection on load
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:3003");
    ws.current.onopen = () => {
      console.log("WS connection opened!");
      setConnectionOpen(true);
    };
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setChatData((_messages) => [..._messages, data]);
    };
    return () => {
      console.log("Cleaning up...");
      ws.current.close();
    };
  }, []);

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
