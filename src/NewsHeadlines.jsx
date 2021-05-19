import { useEffect, useState } from "react";
import "./Styles/NewsHeadlines.css";

const NewsHeadlines = () => {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=us&apiKey=f602aeb104b04c979bfcad19e0768fe1"
    )
      .then((res) => res.json())
      .then((res) => {
        setHeadlines(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {typeof headlines.articles != "undefined" ? (
        <div className="news-container">
          <div className="news">
            <img
              src={headlines.articles[1].urlToImage}
              alt=""
              style={{ marginLeft: "-2rem" }}
            />
            <label className="titles">{headlines.articles[1].title}</label>
          </div>
          <div className="news">
            <img
              src={headlines.articles[2].urlToImage}
              alt=""
              style={{ marginLeft: "-2rem" }}
            />
            <label className="titles">{headlines.articles[2].title}</label>
          </div>
          <div className="news">
            <img
              src={headlines.articles[5].urlToImage}
              alt=""
              style={{ marginLeft: "-2rem" }}
            />
            <label className="titles">{headlines.articles[5].title}</label>
          </div>
          <div className="news">
            <img
              src={headlines.articles[4].urlToImage}
              alt=""
              style={{ marginLeft: "-2rem" }}
            />
            <label className="titles">{headlines.articles[4].title}</label>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NewsHeadlines;
