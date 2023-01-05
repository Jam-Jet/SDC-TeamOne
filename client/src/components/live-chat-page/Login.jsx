import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

const Login = () => {
    return (
      <div>
        <main>
          <div id="login-main">
            <div className="login-title-total">
                <div className="login-title">USER LOGIN</div>
                <div className="login-welcome">Welcome to the WorldWideChat</div>
            </div>
            <input className="login-username" placeholder="Username" type="text" />
            <input className="login-password" placeholder="Password" type="password" />
            <div className="login-selection">
                <div className="login-remember">
                        <Form >
                            <Form.Check 
                                 id={'login-box'}
                                />
                        </Form>
                    <div>Remember</div>
                </div>
                <div className="login-forget">
                    <a  className="login-a-forget"href="">Forgot your password?</a>
                </div>
            </div>
            <Button id="login-login">LOGIN</Button>
            <div className="login-create">
                <a className="login-a-create" href="">Create Account</a>
            </div>
          </div>
        </main>
      </div>
    );
  };
  
  export default Login;
  

