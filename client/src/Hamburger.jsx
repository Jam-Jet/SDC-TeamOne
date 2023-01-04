import React, { useState } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import "./Navbar.css";

function MenuModal() {
    // const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
  
    function handleShow() {
      setShow(true);
    }
  
    return (
      <>
        <Button
          id="menuButton"
          size="lg"
          onClick={() => handleShow()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          
        </Button>
        <Modal
          id="modal-main"
          show={show}
        //   fullscreen={fullscreen}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton closeVariant="black" id="modal-header">Settings</Modal.Header>
          <Modal.Body id="modal-body">
            <Container id="ham-list">
              {/* <Row> */}
                <Col>Profile</Col>
                <Col>New Chat</Col>
                <Col>Messages</Col>
              {/* </Row>
              <Row> */}
                <Col>Find Friends</Col>
                <Col>Log Out</Col>
                {/* <Col>List 6</Col> */}
              {/* </Row> */}
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default MenuModal;