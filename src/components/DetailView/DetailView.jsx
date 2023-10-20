import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

// TODO: once clicked on, will need to pass on the user_concerts.id
// to the concertSaga to make sure the corrct user_concert is shown


function DetailView() {
  const id= useParams().id
  const history = useHistory();
  const dispatch = useDispatch();
// Selector to get info from store
  const user = useSelector((store) => store.user);
  const store= useSelector ((store) => store)
  useEffect(() => {
    console.log("userID:", user, id);
    // I do not want user I want user_concerts.id 
    dispatch({ type: "FETCH_DETAIL_VIEW", payload: {id} });
    console.log(store);
  }, []);

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch({ type: "DELETE_CONCERT", payload: {id}})
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <h4>Concert Recap (DetailView):</h4>
      {/* Display the entire store as JSON TODO: will need to remove eventually*/}
      <pre>{JSON.stringify(store.concertDetail, null, 2)}</pre>

<button onClick={() => history.push(`/edit/${id}`)}>edit</button>
<br/>
<button onClick={handleDelete}>Delete Concert</button>
<br/>
<br/>
<br/>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default DetailView;
