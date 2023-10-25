import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Fuse from "fuse.js";
function ListView() {
  const history = useHistory();
  const dispatch = useDispatch();
  // Selector to get info from store
  const user = useSelector((store) => store.user);
  const store = useSelector((store) => store);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const concertList = useSelector(
    (store) => store.concertList.concertListReducer
  );
  const processedSearchResults = searchResults.map((result) => result.item);

  useEffect(() => {
    dispatch({ type: "FETCH_LIST_VIEW", payload: user });
  }, []);
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    // trying fuzzy search
    const fuse = new Fuse(concertList, {
      keys: [["bands"], "venue", "city", "date", "state"],
      threshold: 0.2,

    });
    //end of fuzzy search
    if (!searchQuery) {
      // If the search query is empty, show all concerts
      setSearchResults([]);
    } else {
      // Perform the Fuse.js search and update searchResults
      const results = fuse.search(searchQuery);
      setSearchResults(results);
    }
  }, [searchQuery, concertList]);
  return (
    <div className="container">

      <input
        placeholder="Search"
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
      ></input>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <h4>Concert Recap (List View):</h4>
      <div>
        {(searchQuery ? processedSearchResults : concertList).map(
          (concert, index) => (
            <>
              <div
                className="concertList"
                key={index}
                onClick={() =>
                  history.push(`/details/${concert.userconcertid}`)
                }
              >
                <ul>
                  <hr />
                  <li style={{ listStyleType: "none" }}>
                    {new Date(concert.date).toLocaleDateString()}
                  </li>
                  {/* <li>{concert.bands}</li> */}
                  {Array.isArray(concert.bands) &&
                    concert.bands.map((band, index) => (
                      <li
                        className="bold"
                        style={{ listStyleType: "none" }}
                        key={index}
                      >
                        {band}
                      </li>
                    ))}
                  <li style={{ listStyleType: "none" }} key={index}>
                    {concert.venue} 
                  </li>
                  <li style={{ listStyleType: "none" }} key={index}>
                    {concert.city}, {concert.state}
                  </li>
                  <hr />
                </ul>
              </div>
            </>
          )
        )}
      </div>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ListView;
