import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { appContext } from "../../App";

const UsernameModal = () => {
  const { showUsernameModal, setShowUsernameModal } = useContext(appContext);
  const handleHide = () => {
    setShowUsernameModal(false);
  };

  return (
    <Modal
      show={showUsernameModal}
      onHide={handleHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
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
        ></input>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="dark"
          onClick={handleHide}
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
