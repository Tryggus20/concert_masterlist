import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function ListView() {
  const history = useHistory();
  const dispatch = useDispatch();
  // Selector to get info from store
  const user = useSelector((store) => store.user);
  const store = useSelector((store) => store);
  const concertList = useSelector(
    (store) => store.concertList.concertListReducer
  );
  useEffect(() => {
    console.log("userID:", user);
    dispatch({ type: "FETCH_LIST_VIEW", payload: user });
  }, []);
  console.log("concertList", concertList, concertList.bands);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <h4>Concert Recap (List View):</h4>
      <div>
        {concertList.map((concert, index) => (
          <>
            <div
              className="concertList"
              key={index}
              onClick={() => history.push(`/details/${concert.userconcertid}`)}
            >
              <ul>
                <hr/>
                <li style={{ listStyleType: 'none' }}>{new Date(concert.date).toLocaleDateString()}</li>
                {/* <li>{concert.bands}</li> */}
                {concert.bands.map((band, index) => (
                  <li className="bold" style={{ listStyleType: 'none' }}>{band}</li>
                ))}
                <li style={{ listStyleType: 'none' }}>{concert.venue}</li>
                <li style={{ listStyleType: 'none' }}>{concert.city}, {concert.state}</li>
                <hr/>
              </ul>
            </div>
            
          </>
        ))}
      </div>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ListView;
