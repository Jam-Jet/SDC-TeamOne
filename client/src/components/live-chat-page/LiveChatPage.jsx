import UserChatBlurb from "./UserChatBlurb";
import RecipientChatBlurb from "./RecipientCharBlurb";
import Button from "react-bootstrap/Button";

const LiveChatPage = () => {
  return (
    <div>
      <main>
        <div id="chat-header">
          <div id="header-line"></div>
          <h1>Start Chatting</h1>
          <div id="header-line"></div>
        </div>
        <div id="chat-wrapper">
          <div id="chat-content">
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
            <UserChatBlurb />
            <RecipientChatBlurb />
            <UserChatBlurb />
          </div>
          <div id="input-and-btn-wrapper">
            <input id="chat-input"></input>
            <Button variant="success" id="send-chat-btn">
              Send
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveChatPage;
