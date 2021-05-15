import "./Styles/ChatView.css";
import { useEffect, useState } from "react";
import { db } from "./Firebase";
import profile from "./icons/profile.svg";

const ChatView = ({ msgs, setMsgs, user, finder }) => {
  const [loader, setloader] = useState(false);

  useEffect(() => {
    setloader(true);
    try {
      db.collection("msgs")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMsgs(snapshot.docs.map((doc) => doc.data()));
          setloader(false);
          window.scrollTo(0, 10000000000);
        });
    } catch (err) {
      setloader(false);
      console.log(err);
    }
  }, [setMsgs]);

  const filteredMessage =
    finder !== ""
      ? msgs.filter((msg) =>
          msg.msg.toLowerCase().includes(finder.toLowerCase())
        )
      : msgs;
  return (
    <>
      <div className="chat-list-parent">
        <div className="chat-list">
          <div
            className="lds-facebook"
            style={{
              position: "fixed",
              opacity: loader ? "0.7" : "0",
              left: "50%",
              transform: "translateX(-50%)",
              top: "40%",
            }}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
          {filteredMessage.map((msg) => {
            return (
              <div className="chatbox">
                <img
                  src={msg.dpImage !== "" ? msg.dpImage : profile}
                  alt=""
                  width="40rem"
                  height="40rem"
                  style={{
                    borderRadius: "50%",
                    marginLeft: user === msg.user ? "1rem" : "-4rem",
                  }}
                />
                <div
                  key={msg.timestamp}
                  className={user === msg.user ? "chat-boxes" : "chat-boxes-nu"}
                  style={{
                    fontWeight: msg.font === "b" ? 1000 : "normal",
                    borderStyle: msg.img !== "" ? "none" : "solid",
                  }}
                >
                  <label
                    style={{
                      display: msg.user === user ? "none" : "flex",
                      fontSize: "1rem",
                    }}
                  >
                    {msg.user + ": "}
                  </label>
                  {
                    <img
                      src={msg.img}
                      alt=""
                      width="200px"
                      onClick={(o) => window.open(o.target.src)}
                      style={{
                        borderRadius: "0.8rem",
                        margin: msg.img !== "" ? "0 -1.25rem" : 0,
                        cursor: "pointer",
                      }}
                    />
                  }
                  {msg.msg}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ChatView;
