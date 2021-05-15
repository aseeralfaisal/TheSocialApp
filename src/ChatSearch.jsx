import "./Styles/ChatSearch.css";
import searchIcon from "./icons/manage_search_black_24dp.svg";

const ChatSearch = ({ finder, setFinder }) => {
  return (
    <div className="search-bar">
      <div>
        <img
          src={searchIcon}
          alt=""
          width="40rem"
          data-testid="img"
          style={{
            position: "fixed",
            marginLeft: "80px",
            marginTop: "0.25rem",
            filter: "invert(1)",
            opacity: 0.5,
          }}
        />
      </div>
      <div>
        <input
          value={finder}
          className="search-input"
          type="text"
          style={{ display: "flex", justifyContent: "center" }}
          placeholder="Search Conversation..."
          onChange={(e) => setFinder(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ChatSearch;
