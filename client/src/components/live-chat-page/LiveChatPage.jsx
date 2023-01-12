import UserChatBlurb from "./UserChatBlurb";
import RecipientChatBlurb from "./RecipientChatBlurb";
import Button from "react-bootstrap/Button";
import UsernameModal from "./UsernameModal";
import NavBar from "./Navbar";
import { appContext } from "../../App";
import { useContext, useEffect, useRef, useState } from "react";

const LiveChatPage = () => {
  const {
    setCurrentMessage,
    currentMessage,
    chatData,
    setChatData,
    currentUserData,
  } = useContext(appContext);

  const [count, setCount] = useState(1);
  const [randomMessageData, setRandomMessageData] = useState();
  const ws = useRef();
  const scrollTarget = useRef();
  const currentTime = new Date();

  // let min = 500;
  // let max = 5000;
  // let randomInterval = Math.floor(Math.random() * (max - min) + min);
  // console.log(randomInterval);

  // useEffect(() => {
  //   console.log("count: ", count);
  //   setCount((_count) => {
  //     _count += 1;
  //   });
  // }, []);

  // useEffect(() => {
  //   console.log("count: ", count);
  //   setCount((_count) => {
  //     _count++;
  //   });
  // }, [count]);

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
            {/* {
              (useEffect(() => {
                return (
                  <RecipientChatBlurb
                    message={randomMessageData.message}
                    send_date={randomMessageData.send_date}
                    username={randomMessageData.username}
                  />
                );
              }),
              [randomMessageData])
            } */}
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
