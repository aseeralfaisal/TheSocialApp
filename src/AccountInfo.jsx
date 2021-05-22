import { useEffect, useState } from "react";
import "./Styles/AccountInfo.css";
import { auth, db } from "./Firebase";
import profileICO from "./icons/profile.svg";

const AccountInfo = ({ dpImage, backdrop, setBackdrop, user }) => {
  const [fullname, setFullname] = useState("");
  const [profession, setProfession] = useState("");
  const [address, setAddress] = useState("");
  const [hobbies, setHobbies] = useState("");

  useEffect(() => {
    db.collection("dplink")
      .doc(user + "Info")
      .onSnapshot((e) => {
        try {
          setFullname(e.data().fullname);
          setProfession(e.data().profession);
          setAddress(e.data().address);
          setHobbies(e.data().hobbies);
        } catch (err) {
          console.error(err);
        }
      });
  }, [user]);

  const saveInfo = () => {
    db.collection("dplink")
      .doc(user + "Info")
      .update({
        fullname: fullname,
        name: auth.currentUser.displayName,
        profession: profession,
        address: address,
        hobbies: hobbies,
      });
    setBackdrop(false);
  };

  return (
    <div
      className="backdrop"
      style={{ visibility: backdrop ? "visible" : "hidden" }}
    >
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "6rem" }}
      >
        <img
          src={dpImage === "" ? profileICO : dpImage}
          width="200px"
          height="195px"
          alt=""
          style={{ borderRadius: "50%" }}
        />
      </div>

      <div className="change-info-parent" style={{ marginTop: "2rem" }}>
        <div className="change-info">
          <label>Full Name:</label>
          <input
            type="text"
            className="input-info"
            placeholder="type your full name"
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <div className="change-info">
          <label>Profession:</label>
          <input
            type="text"
            className="input-info"
            placeholder="type your profession"
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>

        <div className="change-info">
          <label>Address:</label>
          <input
            type="text"
            className="input-info"
            placeholder="set your address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="change-info">
          <label>Hobbies:</label>
          <input
            type="text"
            className="input-info"
            placeholder="set your hobbies"
            onChange={(e) => setHobbies(e.target.value)}
          />
        </div>

        <div className="change-info" style={{ marginTop: "1rem" }}>
          <button className="acc-info-button" onClick={saveInfo}>
            Change Info
          </button>
          <button
            style={{ marginRight: "1rem" }}
            className="acc-info-button"
            onClick={() => setBackdrop(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
