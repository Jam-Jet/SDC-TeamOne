const UserChatBlurb = (props) => {
  return (
    <div id="user-chat-blurb-wrapper">
      <div id="text-and-username-row">
        <p id="user-message">{props.message}</p>
        <span id="user-name">
          <b>{props.username}</b>
        </span>
      </div>
      <span id="user-time-stamp">{props.send_date}</span>
    </div>
  );
};

export default UserChatBlurb;
