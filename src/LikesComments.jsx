import { useEffect, useState } from "react";
import { auth, db } from "./Firebase";
import likesIco from "./icons/thumb_up.svg";
import closeIco from "./icons/close.svg";
// import likesFilledIco from "./icons/thumb_up_filled.svg";
import "./Styles/LikesComments.css";

function Comments({ postID, user, posts }) {
  const [commentView, setCommentView] = useState([]);
  const [likes, setLikes] = useState(0);
  const [likeList, setLikeList] = useState([]);
  const [likesFlag, setLikesFlag] = useState(true);

  useEffect(() => {
    try {
      db.collection("posts")
        .doc(postID)
        .collection("comments")
        .onSnapshot((snap) => {
          setCommentView(snap.docs.map((doc) => doc.data()));
        });
    } catch (err) {
      console.log(err);
    }
  }, [postID]);

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .doc(postID)
      .onSnapshot((snap, err) => {
        setLikes(snap.data().likes);
        setLikeList(snap.data().likeList);
        console.log(err);
      });
    return () => {
      unsubscribe();
    };
  }, [postID]);

  const likesClick = (lik) => {
    lik = 0;
    if (user) {
      if (likesFlag) {
        if (likeList.includes(user)) {
          likeList.splice(likeList.indexOf(user), 1);
          setLikesFlag(true);
          db.collection("posts")
            .doc(postID)
            .update({
              likes: (lik += Number(likes) - 1),
              likeList: [...likeList],
            });
        } else {
          db.collection("posts")
            .doc(postID)
            .update({
              likes: (lik += Number(likes) + 1),
              likeList: [...likeList, user],
            });
          setLikesFlag(false);
        }
      } else if (likesFlag === false) {
        likeList.splice(likeList.indexOf(user), 1);
        setLikesFlag(true);
        db.collection("posts")
          .doc(postID)
          .update({
            likes: (lik += Number(likes) - 1),
            likeList: [...likeList],
          });
      }
    }
  };

  const deletePost = () => {
    db.collection("posts").doc(postID).delete();
  };

  return (
    <>
      <div className="root">
        <div className="likes">
          <label onClick={likesClick}>
            <img src={likesIco} alt="" width="35rem" />
            <label style={{ visibility: likes < 1 ? "hidden" : "visible" }}>
              {likes}
            </label>
          </label>
          <div
            style={{
              display:
                // eslint-disable-next-line
                likeList === undefined || likeList == "" ? "none" : "flex",
            }}
          >{`liked by ${likeList}`}</div>
          <div
            className="delete-post"
            style={{
              display: user !== posts.map(post => post.user) ? "flex`" : "flex",
            }}
          >
            <img src={closeIco} alt="" />
            <label className="delete-post-btn" onClick={deletePost}>
              Remove post
            </label>
          </div>


        </div>
        {commentView
          // .slice(0, 3)
          // .filter((view, index) => index <= 3)
          .map((view) => {
            return (
              <div key={view.timestamp} style={{ margin: "0.25rem 0" }}>
                <img
                  src={view.dpImage}
                  alt=""
                  width="30rem"
                  height="30rem"
                  style={{ borderRadius: "50%", margin: "-0.45rem 0.5rem" }}
                />
                {view.user}: {view.comments}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Comments;
