import "./Styles/App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ChatSearch from "./ChatSearch";
import BottomSidebar from "./BottomSidebar";
import { auth, db } from "./Firebase";
import ChatView from "./ChatView";
import UserList from "./UserList";
import { useHistory } from "react-router";

const Messages = ({ user, setUser, dpImage, setDpImage, authUser }) => {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([""]);
  const [finder, setFinder] = useState("");
  const [font, setFont] = useState("n");
  const [click, setClick] = useState(false);
  const history = useHistory();

  if (authUser) {
    history.push("/messages");
  } else {
    history.push("/");
  }
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(auth.currentUser.displayName);
    });
  }, [setUser]);

  useEffect(() => {
    db.collection("dplink")
      .doc(user + "Info")
      .get()
      .then((e) => {
        setDpImage(e.data().dpImage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setDpImage, user]);

  const sendMsg = (e) => {
    e.preventDefault();
    if (user !== null) {
      if (input) {
        if (e.keyCode === 13) {
          db.collection("msgs").doc().set({
            msg: input,
            img: "",
            user: user,
            dpImage: dpImage,
            usr_dp: user[0],
            timestamp: new Date(),
            font: font,
          });
          setInput("");
          window.scrollTo(0, 10000000000);
        }
      }
    } else {
      alert("Invalid User");
      window.location.reload();
    }
  };
  return (
    <div className="App">
      <Navbar
        user={user}
        setUser={setUser}
        dpImage={dpImage}
        setDpImage={setDpImage}
      />
      <ChatSearch
        user={user}
        msgs={msgs}
        finder={finder}
        setFinder={setFinder}
      />
      <UserList dpImage={dpImage} user={user} setDpImage={setDpImage} />
      <ChatView
        msgs={msgs}
        setMsgs={setMsgs}
        user={user}
        finder={finder}
        setFinder={setFinder}
        font={font}
        dpImage={dpImage}
      />
      <BottomSidebar
        input={input}
        setInput={setInput}
        sendMsg={sendMsg}
        font={font}
        user={user}
        setFont={setFont}
        click={click}
        setClick={setClick}
        dpImage={dpImage}
      />
    </div>
  );
};

export default Messages;
