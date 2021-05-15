import "./Styles/Login.css";
import loginLogo from "./icons/login.svg";
import { auth, db } from "./Firebase";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = ({ dpImage, setAuthUser }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorText, setErrorText] = useState();
  const history = useHistory();

  const login = () => {
    if (email === "" || pass === "") {
      return setErrorText("😟 Please fill up the fields");
    }
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        // var user = userCredential.user;
        // console.log(user);
        setAuthUser(true);
        history.push("/feed");
        db.collection("dplink")
          .doc(auth.currentUser.displayName + "Info")
          .update({
            isActive: true,
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        errorCode && errorMessage
          ? setErrorText("😟 Incorrect Username or Password")
          : setErrorText("🥲 Sorry! Something went wrong");
      });
  };

  const login_call = (e) => {
    if (e.keyCode === 13) {
      return login();
    }
  };
  return (
    <div>
      <div className="login">
        <div>
          <img src={loginLogo} alt="" width="100rem" />
        </div>
        <label style={{ fontSize: "3rem" }}>Login to the app</label>
        <div>
          <label>{errorText}</label>
        </div>

        <div className="sign-in-form">
          <div className="border">
            <div>
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="Password"
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
                onKeyUp={login_call}
              />
            </div>

            <div className="buttons">
              <div>
                <button className="btn2" onClick={login}>
                  Login
                </button>
              </div>
              <div>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Create new account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
