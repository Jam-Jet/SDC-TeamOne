import UserChatBlurb from "./UserChatBlurb";
import RecipientChatBlurb from "./RecipientChatBlurb";
import Button from "react-bootstrap/Button";
import UsernameModal from "./UsernameModal";
import NavBar from "./Navbar";

const LiveChatPage = () => {
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
