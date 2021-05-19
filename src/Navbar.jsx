import logo from "./icons/logo_main.svg";
import messages from "./icons/messages.svg";
import profile from "./icons/profile.svg";
import feed from "./icons/newsfeed.svg";
import logoutICO from "./icons/logout.svg";
import menuICO from "./icons/menu.svg";
import "./Styles/App.css";
import "./Styles/Navbar.css";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { db, auth } from "./Firebase";
import AccountInfo from "./AccountInfo";
import info_settingsICO from "./icons/info_settings.svg";

const Navbar = ({ user, dpImage, newMsg, setNewMsg }) => {
  const [backdrop, setBackdrop] = useState(false);
  const history = useHistory();
  const [menu, setMenu] = useState(false);

  const logout = () => {
    auth.signOut().then((e) => {
      history.push("/");
    });
    db.collection("dplink")
      .doc(auth.currentUser.displayName + "Info")
      .update({
        isActive: false,
      });
    console.log("signed out");
  };

  return (
    <>
      <AccountInfo
        dpImage={dpImage}
        backdrop={backdrop}
        setBackdrop={setBackdrop}
        user={user}
      />
      <div className="top_header">
        <div className="head_title">
          <img
            src={logo}
            width="65px"
            alt="main_logo"
            style={{ opacity: 0.9 }}
          />
          <h1 className="title">The Social App</h1>
        </div>
        <ul className="top_nav">
          <div
            className="flyout-parent"
            style={{ visibility: menu ? "visible" : "hidden" }}
          >
            <div className="flyout" onClick={() => setBackdrop(true)}>
              <button>
                <img src={info_settingsICO} alt="" width="35px" /> Set Info
              </button>
            </div>

            <div
              className="flyout"
              onClick={logout}
              style={{ marginTop: "1rem" }}
            >
              <button>
                <img src={logoutICO} alt="" width="35px" /> Logout
              </button>
            </div>
          </div>

          <NavLink exact to="/feed" className="link-to" activeClassName="link-to-active">
            <img src={feed} width="40" alt="" />
            <h2 className="text">Feed</h2>
          </NavLink>

          <NavLink exact to="/messages" className="link-to" activeClassName="link-to-active">
            <img src={messages} width="40" alt="" />
            <h2 className="text">Chat</h2>
          </NavLink>

          <NavLink exact to="/profile" className="link-to" activeClassName="link-to-active">
            <img
              src={dpImage !== "" ? dpImage : profile}
              width="40px"
              height="40px"
              alt=""
              style={{ borderRadius: "50%", filter: "none" }}
            />
            <h2 className="text">{user}</h2>
          </NavLink>

          <Link className="link-to" onClick={() => setMenu(!menu)}>
            <img src={menuICO} width="40" alt="" />
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
