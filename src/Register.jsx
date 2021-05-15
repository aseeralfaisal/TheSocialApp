import "./Styles/Register.css";
import loginLogo from "./icons/login.svg";
import { useState } from "react";
import { db, auth } from "./Firebase";
import { useHistory } from "react-router";

const Register = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const history = useHistory("");
  const [errorText, setErrorText] = useState("😄 Fill Up the form");

  const register = (e) => {
    e.preventDefault();
    if (email === "" || pass === "") setErrorText("😓 Fields are required");
    else if (confirmPass !== pass) setErrorText("😓 Passwords do not match");
    else
      auth
        .createUserWithEmailAndPassword(email, pass)
        .then((e) => {
          e.user.updateProfile({
            displayName: user,
          });
          db.collection("dplink")
            .doc(user + "Info")
            .set({
              dpImage: "",
              name: user,
            });
          // setLogUser(true);
          setErrorText("😄 Registration Successful");
          history.push("/");
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
        });
  };

  return (
    <div>
      <div className="register">
        <div>
          <img src={loginLogo} alt="" width="100rem" />
        </div>
        <label style={{ fontSize: "3rem" }}>Register to the app</label>
        <div>
          <label>{errorText}</label>
        </div>

        <div className="sign-up-form">
          <div className="border">
            <div>
              <input
                type="text"
                placeholder="Type your E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Type your Username"
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Type your password"
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div>
              <input
                type="Confirm your password"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>

            <div className="buttons">
              <div>
                <button className="btn2" onClick={register}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
