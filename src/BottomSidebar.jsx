import { useRef, useState } from "react";
import "./Styles/BottomSidebar.css";
import emojiIcon from "./icons/mood_black_24dp.svg";
import insertPhoto from "./icons/insert_photo.svg";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { db, storage } from "./Firebase";

const BottomSidebar = ({
  input,
  setInput,
  sendMsg,
  setFont,
  click,
  setClick,
  user,
  dpImage,
}) => {
  const [bold, setBold] = useState(false);
  const InputRef = useRef();
  const [loader, setLoader] = useState(false);
  const Bold = () => {
    setBold(!bold);
    setFont("b");
  };
  const onEmojiClick = (e) => {
    InputRef.current.focus();
    const start = input.substring(0, InputRef.current.selectionStart);
    const end = input.substring(InputRef.current.selectionStart);
    const text = start + e.native + end;
    setInput(text);
  };

  const imgOnChange = (e) => {
    setLoader(true);
    let file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child("img/" + file.name);
    fileRef.put(file).then((snap) =>
      snap.ref.getDownloadURL().then((url) => {
        db.collection("msgs").doc().set({
          msg: input,
          img: url,
          user: user,
          dpImage: dpImage,
          usr_dp: user[0],
          timestamp: new Date(),
        });
        setLoader(false);
      })
    );
  };

  return (
    <>
      <div
        id="pickerDiv"
        style={{
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          top: "46%",
          zIndex: "1",
          width: "100%",
          alignItems: "center",
          visibility: click ? "visible" : "hidden",
        }}
      >
        <Picker
          onClick={onEmojiClick}
          theme="dark"
          native={true}
          sheetSize={16}
        />
      </div>
      <div className="chat">
        <div className="chat-bg"></div>
        <div className="text-features">
          <div className="feature" onClick={Bold}>
            B
          </div>
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          ref={InputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={sendMsg}
          style={bold ? setFont("b") && { fontWeight: "bold" } : setFont("n")}
        />
        <img
          src={emojiIcon}
          alt="emojiIcon"
          style={{
            marginLeft: -35,
            cursor: "pointer",
            filter: "invert(1)",
            opacity: 0.9,
          }}
          onClick={() => setClick(!click)}
        />
        <input
          id="file"
          type="file"
          style={{ display: "none" }}
          onChange={imgOnChange}
        />
        <label htmlFor="file" className="insertPhoto">
          <img src={insertPhoto} alt="" />
        </label>
        <div
          className="lds-facebook"
          style={{
            opacity: loader ? "0.7" : 0,
            marginTop: "-1.15rem",
            position: "fixed",
            transform: "scale(0.5)",
            marginLeft: "17rem",
          }}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default BottomSidebar;
