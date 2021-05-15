import profile from "./icons/profile.svg";
import "./Styles/Profile.css";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { storage, db, auth } from "./Firebase";
import location from "./icons/location.svg";
import professionICO from "./icons/profession.svg";
import emailICO from "./icons/email.svg";
import hobbiesICO from "./icons/hobbies.svg";
import { useHistory } from "react-router";

const Profile = ({ user, dpImage, setDpImage, authUser }) => {
  const [showProgress, setShowProgress] = useState(false);
  const [fullname, setFullname] = useState("");
  const [profession, setProfession] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [hobbies, setHobbies] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (authUser) {
      history.push("/profile");
    } else {
      history.push("/");
    }
  }, [authUser, history]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setEmail(user.email);
    });
  }, []);

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

  useEffect(() => {
    db.collection("dplink")
      .doc(user + "Info")
      .onSnapshot((e) => {
        try {
          setFullname(e.data().fullname);
          setAddress(e.data().address);
          setProfession(e.data().profession);
          setHobbies(e.data().hobbies);
        } catch (err) {
          console.error(err);
        }
      });
  }, [user]);

  const dpSelector = (e) => {
    try {
      setShowProgress(true);
      let dpFile = e.currentTarget.files[0];
      let storageRef = storage.ref().child("DP/" + dpFile.name);
      storageRef.put(dpFile).then((snap) =>
        snap.ref.getDownloadURL().then((url) => {
          db.collection("dplink")
            .doc(auth.currentUser.displayName + "Info")
            .update({
              dpImage: url,
            });
          setDpImage(url);
          setShowProgress(false);
        })
      );
    } catch (err) {
      setShowProgress(false);
      console.log(err);
    }
  };

  return (
    <>
      <Navbar user={user} dpImage={dpImage} setDpImage={setDpImage} />

      <div className="profile" style={{ marginTop: "6rem" }}>
        {
          <img
            src={dpImage === "" ? profile : dpImage}
            width="200px"
            height="195px"
            alt=""
            style={{ borderRadius: "50%" }}
          />
        }
      </div>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <div
          className="lds-ellipsis"
          style={{ opacity: showProgress !== false ? "1" : "0" }}
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div style={{ marginTop: "-1.5em" }}>
          <label htmlFor="DP_selector" className="dp-button">
            Profile Picture
          </label>
        </div>

        <input
          type="file"
          id="DP_selector"
          onChange={dpSelector}
          style={{ display: "none" }}
        />

        <div className="dp-info" style={{ marginTop: "2rem" }}>
          <label style={{ color: "lightgreen" }}>
            <img
              src={emailICO}
              alt=""
              width="30px"
              style={{ margin: "-0.5rem 0.5rem" }}
            />
            {email}
          </label>
        </div>

        <div className="dp-info">
          <label>
            <img
              src={profile}
              alt=""
              width="30px"
              style={{ margin: "-0.5rem 0.5rem" }}
            />
            {fullname}
          </label>
        </div>

        <div className="dp-info">
          <label>
            <img
              src={professionICO}
              alt=""
              width="30px"
              style={{ margin: "-0.5rem 0.5rem" }}
            />
            {profession}
          </label>
        </div>

        <div className="dp-info">
          <label>
            <img
              src={location}
              alt=""
              width="30px"
              style={{ margin: "-0.5rem 0.5rem" }}
            />
            {address}
          </label>
        </div>

        <div className="dp-info">
          <label>
            <img
              src={hobbiesICO}
              alt=""
              width="30px"
              style={{ margin: "-0.5rem 0.5rem" }}
            />
            {hobbies}
          </label>
        </div>
      </div>
    </>
  );
};

export default Profile;
