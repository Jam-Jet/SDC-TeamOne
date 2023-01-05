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
          Choose Your Username
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "white" }}>
        <input style={{ width: "90%" }}></input>
        <Button onClick={handleHide}>Close</Button>
      </Modal.Body>
      {/* <Modal.Footer>
      </Modal.Footer> */}
    </Modal>
  );
};

export default UsernameModal;
