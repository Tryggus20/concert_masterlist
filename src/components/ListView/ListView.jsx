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
    <div className=" listViewContainer">
      <h1 className="listHeader">List View</h1>
      <div className="searchHolder">
        <input
          className="listSearch"
          placeholder="Search"
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
        ></input>
      </div>
      <div>
        {(searchQuery ? processedSearchResults : concertList).map(
          (concert, index) => (
            <>
              <div
                className="concertList listView"
                key={index}
                onClick={() =>
                  history.push(`/details/${concert.userconcertid}`)
                }
              >
                <ul>
                  <hr />
                  <li className="indentHeader" style={{ listStyleType: "none" }}>
                    {new Date(concert.date).toLocaleDateString()}
                  </li>
                  <li className="bold indentHeader">Bands:</li>
                  {Array.isArray(concert.bands) &&
                    concert.bands.map((band, index) => (
                      <li
                        className="indentBand"
                        style={{ listStyleType: "none" }}
                        key={index}
                      >
                        {band}
                      </li>
                    ))}
                  <li className="bold indentHeader">Location:</li>
                  <li
                    className="liLocation indentBand"
                    style={{ listStyleType: "none" }}
                    key={index}
                  >
                    {concert.venue} in {concert.city}, {concert.state}
                  </li>
                  {/* <li
                    className="liLocation"
                    style={{ listStyleType: "none" }}
                    key={index}
                  >
                    {concert.city}, {concert.state}
                  </li> */}
                  <hr />
                </ul>
              </div>
            </>
          )
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default ListView;
