import { useEffect, useState } from "react";
import { db } from "./Firebase";
import "./Styles/UserList.css";

const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    db.collection("dplink").onSnapshot((snap) => {
      setUserList(snap.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="user-list">
      <label style={{ color: "lightgreen" }}>Active Users</label>{" "}
      {userList.map((user) => {
        return (
          <div className="list">
            <div>
              <img
                style={{
                  opacity: user.isActive ? "1" : "0.6",
                  borderRadius: "50%",
                }}
                src={user.dpImage}
                alt=""
                width="30px"
                height="30px"
              />
            </div>
            <div>
              <label style={{ opacity: user.isActive ? "1" : "0.6" }}>
                {user.name}
              </label>
              <h1
                style={{
                  fontSize: "0.5rem",
                  display: user.isActive ? "inline" : "none",
                  marginLeft: "0.25rem",
                }}
              >
                🟢
              </h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
