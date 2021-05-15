import "./Styles/App.css";
import Messages from "./Messages";
import Profile from "./Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import Feed from "./Feed";
import { auth } from "./Firebase";

const App = () => {
  document.title = "The Social App";
  const [user, setUser] = useState("");
  const [dpImage, setDpImage] = useState();
  const [authUser, setAuthUser] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user.displayName);
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/messages">
            <Messages
              authUser={authUser}
              user={user}
              setUser={setUser}
              dpImage={dpImage}
              setDpImage={setDpImage}
            />
          </Route>
          <Route path="/profile">
            <Profile
              user={user}
              dpImage={dpImage}
              setDpImage={setDpImage}
              authUser={authUser}
            />
          </Route>
          <Route path="/feed">
            <Feed
              user={user}
              dpImage={dpImage}
              setDpImage={setDpImage}
              authUser={authUser}
            />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Login dpImage={dpImage} setAuthUser={setAuthUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
