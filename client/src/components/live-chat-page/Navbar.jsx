import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import MenuModal from "./Hamburger";

function NavBar() {
  return (
    <Navbar id="main-nav">
      <img
        id="logo"
        src="data:image/png;base64,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"
        alt=""
      />
      <Container id="nav">
        <Navbar.Brand id="nav-title" href="#home">
          CHAT APP
        </Navbar.Brand>
        <MenuModal />
      </Container>
    </Navbar>
  );
}

export default NavBar;
