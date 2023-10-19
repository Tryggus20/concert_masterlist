import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";

// TODO: once clicked on, will need to pass on the user_concerts.id
// to the concertSaga to make sure the corrct user_concert is shown


function DetailView() {
  const history = useHistory();
  const dispatch = useDispatch();
// Selector to get info from store
  const user = useSelector((store) => store.user);
  const store= useSelector ((store) => store)
  useEffect(() => {
    console.log("userID:", user);
    dispatch({ type: "FETCH_DETAIL_VIEW", payload: user });
    console.log(store);
  }, []);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <h4>Concert Recap (DetailView):</h4>
      {/* Display the entire store as JSON TODO: will need to remove eventually*/}
      <pre>{JSON.stringify(store.concertDetail, null, 2)}</pre>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default DetailView;
