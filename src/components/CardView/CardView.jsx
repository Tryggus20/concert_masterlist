import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";

// bands may not be staying in order

function CardView() {
  const history = useHistory();
  const dispatch = useDispatch();
// Selector to get info from store
  const user = useSelector((store) => store.user);
  const store= useSelector ((store) => store)
  useEffect(() => {
    console.log("userID:", user);
    dispatch({ type: "FETCH_CARD_VIEW", payload: user });
    console.log(store);
  }, []);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <h4>Concert Recap (CardView):</h4>
      {/* Display the entire store as JSON will need to remove eventually*/}
      <pre>{JSON.stringify(store.concertCard, null, 2)}</pre>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default CardView;
