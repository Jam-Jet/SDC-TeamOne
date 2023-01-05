import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavBarLogin from "./NavbarLogin";
import { useContext } from "react";
import { appContext } from "../../App";

const Login = () => {
  const { setContinueAsGuest } = useContext(appContext);
  const guestClick = () => {
    setContinueAsGuest(true);
  };
  return (
    <div>
      <NavBarLogin />
      <main>
        <div id="login-main">
          <div className="login-title-total">
            <div className="login-title">USER LOGIN</div>
            <div className="login-welcome">Welcome to the WorldWideChat</div>
          </div>
          <input
            className="login-username"
            placeholder="Username"
            type="text"
          />
          <input
            className="login-password"
            placeholder="Password"
            type="password"
          />
          <div className="login-selection">
            <div className="login-remember">
              <Form>
                <Form.Check id={"login-box"} />
              </Form>
              <div>Remember</div>
            </div>
            <div className="login-forget">
              <a className="login-a-forget" href="">
                Forgot your password?
              </a>
            </div>
          </div>
          <Button id="login-login">LOGIN</Button>
          <div className="login-create">
            <div>
              <a className="login-a-create" href="">
                Create Account
              </a>
            </div>
            <div>
              <a className="login-a-guest" onClick={guestClick}>
                Continue as Guest
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
