import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { appContext } from "../../App";

const UsernameModal = () => {
  const {
    showUsernameModal,
    setShowUsernameModal,
    setCurrentUserData,
    currentUserData,
    setNewUser,
    userList,
  } = useContext(appContext);

  const handleHide = () => {
    setShowUsernameModal(false);
  };
  const recordUsername = (e) => {
    setCurrentUserData({ username: e.target.value });
  };

  const submitUsername = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      let postObj = {
        name: currentUserData.username,
      };
      fetch("http://localhost:3003/addGuest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postObj),
      })
        .then((res) =>
          setCurrentUserData({
            username: currentUserData.username,
            user_id: res.json(),
          })
        )
        .then(setNewUser(true))
        .then(handleHide());
    }
  };

  return (
    <Modal
      show={showUsernameModal}
      onHide={handleHide}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      animation
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Guest Username
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "white" }}>
        <input
          id="username-modal-input"
          style={{ width: "100%", height: "38px" }}
          placeholder="Choose your username"
          onChange={recordUsername}
          onKeyPress={submitUsername}
        ></input>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="dark"
          onClick={submitUsername}
          style={{ backgroundColor: "#353a41" }}
        >
          Continue
        </Button>
        <Button
          variant="secondary"
          onClick={handleHide}
          style={{ marginLeft: "5px" }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UsernameModal;
