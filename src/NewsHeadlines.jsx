import { useEffect, useState } from "react";
import "./Styles/NewsHeadlines.css";

const NewsHeadlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=us&apiKey=f602aeb104b04c979bfcad19e0768fe1"
    )
      .then((res) => res.json())
      .then((res) => {
        setHeadlines(res);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {typeof headlines.articles != "undefined" ? (
        <div className="news-container">
          <div
            className="lds-facebook"
            style={{
              opacity: loader ? "0.7" : "0",
              position: "fixed",
              transform: "scale(1)",
              marginLeft: "12rem",
              marginTop: "10rem",
            }}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>

          {headlines.articles.map((article, idx) => {
            console.log(article.url);
            return (
              <div className="news" key={idx}>
                <img
                  src={article.urlToImage}
                  alt=""
                  // style={{ marginLeft: "-4rem" }}
                />
                <a className="titles" rel="noopener noreferrer" href={article.url} target="_blank">
                  {article.title}
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NewsHeadlines;
