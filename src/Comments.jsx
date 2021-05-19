import { useEffect, useState } from "react";
import { db } from "./Firebase";
import likesIco from "./icons/thumb_up.svg";
import likesFilledIco from "./icons/thumb_up_filled.svg";
import "./Styles/Comments.css";

function Comments({ postID, user }) {
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
    try {
      db.collection("posts")
        .doc(postID)
        .onSnapshot((snap) => {
          setLikes(snap.data().likes);
          setLikeList(snap.data().likeList);
        });
    } catch (err) {
      console.log(err);
    }
  }, [postID]);

  const likesClick = (lik) => {
    lik = 0;
    if (user) {
      if (likesFlag) {
        if (likeList.includes(user)) {
          setLikesFlag(false);
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

  return (
    <>
      <div className="root">
        <div className="likes">
          <label onClick={likesClick}>
            <img
              src={likesFlag ? likesIco : likesFilledIco}
              alt=""
              width="35rem"
            />
            <label style={{ visibility: likes < 1 ? "hidden" : "visible" }}>
              {likes}
            </label>
          </label>
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
