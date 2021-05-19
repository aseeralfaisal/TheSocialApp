import { useState } from "react";
import Navbar from "./Navbar";
import "./Styles/Feed.css";
import Comments from "./Comments";
import insertPhoto from "./icons/insert_photo.svg";
import face from "./icons/face_white_24dp.svg";
import profileICO from "./icons/profile.svg";
import emoticon from "./icons/mood_black_24dp.svg";
import closeICO from "./icons/close.svg";
import postICO from "./icons/post.svg";
import { db, storage } from "./Firebase";
import { useEffect } from "react";
import WeatherWidget from "./WeatherWidget";
import NewsHeadlines from "./NewsHeadlines";
// import { useHistory } from "react-router";

const Feed = ({ user, dpImage, setDpImage, authUser }) => {
  const [postInput, setPostInput] = useState("");
  const [file, setFile] = useState("");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState();
  const [loader, setLoader] = useState(false);
  const [progressLoader, setProgressLoader] = useState(true);
  // const history = useHistory();

  // if (authUser) {
  //   history.push("/feed");
  // } else {
  //   history.push("/");
  // }

  useEffect(() => {
    db.collection("dplink")
      .doc(user + "Info")
      .get()
      .then((e) => {
        setDpImage(e.data().dpImage);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [setDpImage, user]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) => {
        setPosts(
          snap.docs.map((doc) => ({
            post: doc.data(),
            id: doc.id,
          }))
        );
        setProgressLoader(false);
      });
  }, []);

  const getFile = (e) => {
    setFile(e.target.files[0]);
  };

  const postOnChange = (e) => {
    try {
      setLoader(true);
      if (file) {
        const ref = storage.ref().child("posts/" + file.name);
        ref.put(file).then((snap) =>
          snap.ref.getDownloadURL().then((url) => {
            db.collection("posts").add({
              title: postInput,
              img: url,
              likes: 0,
              user: user,
              dpImage: dpImage,
              timestamp: new Date(),
            });
            setPostInput("");
            setFile("");
            setLoader(false);
          })
        );
      } else {
        db.collection("posts").add({
          title: postInput,
          img: "",
          likes: 0,
          likeList: [],
          user: user,
          dpImage: dpImage,
          timestamp: new Date(),
        });
        setPostInput("");
        setFile("");
        setLoader(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const postOnChange_call = (e) => {
    if (e.keyCode === 13) {
      postOnChange();
    }
  };

  return (
    <div>
      <Navbar user={user} dpImage={dpImage} />
      <NewsHeadlines />
      <WeatherWidget />
      <div className="feed">
        <div className="create-post">
          <div className="text-post">
            <input
              type="text"
              value={postInput}
              placeholder={`What's on your mind ${user}...`}
              onChange={(e) => setPostInput(e.target.value)}
              onKeyUp={postOnChange_call}
            />
            <div
              className="lds-facebook"
              style={{
                opacity: loader ? "0.7" : "0",
                position: "absolute",
                transform: "scale(0.5)",
                marginLeft: "21rem",
              }}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            <img src={postICO} alt="" width="25px" onClick={postOnChange} />
          </div>
          <div>
            <div
              className="file-selector"
              style={{ display: file === "" ? "none" : "flex" }}
            >
              Selected: {file !== "" ? file.name.slice(0, 32) : ""}...
              <div onClick={() => setFile("")}>
                <img className="close-btn" src={closeICO} alt="" width="25px" />
              </div>
            </div>
            <div
              className="lds-facebook"
              style={{
                position: "fixed",
                opacity: progressLoader ? "0.7" : "0",
                left: "50%",
                transform: "translateX(-50%)",
                top: "40%",
              }}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div className="post-features">
            <div className="post-feature">
              <img src={insertPhoto} alt="" width="35px" />
              <input
                type="file"
                id="postImg"
                onChange={getFile}
                style={{ display: "none" }}
              />
              <label htmlFor="postImg">Photo</label>
            </div>
            <div className="post-feature">
              <img src={face} alt="" width="35px" />
              <label>Feeling</label>
            </div>
            <div className="post-feature">
              <img
                src={emoticon}
                alt=""
                width="35px"
                style={{ filter: "invert(1)" }}
              />
              <label>Emoji</label>
            </div>
          </div>
        </div>
        {posts.map(({ post, id }) => (
          <div key={post.timestamp} className="posts">
            <div>
              <div className="post-top">
                <img
                  src={post.dpImage}
                  alt=""
                  width="40rem"
                  height="40rem"
                  style={{
                    borderRadius: "50%",
                    margin: "0 0.5rem",
                    marginLeft: post.img === "" ? "-14rem" : "0",
                  }}
                />
                <div>
                  <label style={{ textTransform: "capitalize" }}>
                    {post.user}
                  </label>
                  <div
                    style={{
                      marginTop: "1rem",
                      marginLeft: "-3rem",
                      marginBottom: "-1.5rem",
                      fontSize: post.img === "" ? "2.25rem" : "1.25rem",
                    }}
                  >
                    {post.title}
                  </div>
                </div>
              </div>
              <div style={{ display: post.img === "" ? "none" : "flex" }}>
                <img className="post-img" src={post.img} alt="" />
              </div>
            </div>
            <Comments dpImage={dpImage} user={user} postID={id} />
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={profileICO}
                alt=""
                width="40rem"
                height="40rem"
                style={{ borderRadius: "50%", margin: "0 0.5rem" }}
              />
              <input
                className="comment-input"
                value={comments}
                type="text"
                placeholder={`Comment as ${user}`}
                onChange={(e) => setComments(e.target.value)}
                onKeyUp={(e) =>
                  e.keyCode === 13
                    ? db
                        .collection("posts")
                        .doc(id)
                        .collection("comments")
                        .add({
                          comments: comments,
                          user: user,
                          dpImage: dpImage,
                          timestamp: new Date(),
                        }) && setComments("")
                    : ""
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
