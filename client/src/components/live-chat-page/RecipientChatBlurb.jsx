import { propTypes } from "react-bootstrap/esm/Image";

const RecipientChatBlurb = (props) => {
  return (
    <div id="recipient-chat-blurb-wrapper">
      <div id="text-and-recipientname-row">
        <span id="recipient-name">
          <b>{props.username}</b>
        </span>
        <p id="recipient-message">{props.message}</p>
      </div>
      <span id="recipient-time-stamp">{props.send_date}</span>
    </div>
  );
};

export default RecipientChatBlurb;
