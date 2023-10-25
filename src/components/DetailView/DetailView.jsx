import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SpotifyPlayer from "../SpotifyPlayer/SpotifyPlayer";

function DetailView() {
  const id = useParams().id;
  const history = useHistory();
  const dispatch = useDispatch();
  // Selector to get info from store
  const user = useSelector((store) => store.user);
  const store = useSelector((store) => store);
  const concertDetails = useSelector(
    (store) => store.concertDetail.concertDetailReducer
  );
  const spotifyData = useSelector(store => store.spotifyReducer);

// TODO: In detail view, if no image, auto generate a photo?

  useEffect(() => {
    console.log("userID:", user, id);
    dispatch({ type: "FETCH_DETAIL_VIEW", payload: { id } });
    console.log("detailView store", concertDetails);
    console.log("detail view city", concertDetails.city);
  }, []);

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch({ type: "DELETE_CONCERT", payload: { id } });
    history.push(`/home`);
  };
  if (concertDetails.length === 0) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <h4>Concert Recap (DetailView):</h4>
      <p>{new Date(concertDetails[0]?.date).toLocaleDateString()}</p>

      <p className="bold">{concertDetails[0].venue}</p>
      <p>
            {" "}
            {concertDetails[0].city}, {concertDetails[0].state}
          </p>
          <hr />
      {/* Details View starts here!!!!!! */}
      {concertDetails.map((concertDetail, index) => (
        <>        

          {concertDetail.bandpictures?.map((bandpictures, index) => (
            <>
              <script></script>
              <p className="bold">{bandpictures.band}</p>
              {bandpictures.pictureUrls?.map((pictures, index) => (
                <>
                  <img
                    src={pictures}
                    alt="Image not found"
                    style={{ maxHeight: "800px", maxWidth: "800px" }}
                  />
                </>
              ))}
              {/* Will need to componentize spotify player. pass along bandName and do a 
              GET search for that artist, returning first result to get artist.id.
               then another GET request for artist top song or top 3 songs  */}
              <SpotifyPlayer  band={bandpictures.band} />

              <hr />
            </>
          ))}
         
        </>
      ))}

      {/* Details View ends here !!!!!! */}
      <button onClick={() => history.push(`/edit/${id}`)}>edit</button>
      <br />
      <button onClick={handleDelete}>Delete Concert</button>
      <br />
      <br />
      <br />
      <button onClick={history.goBack}>Back</button>
      <br />
      <br />
      <LogOutButton className="btn" />
    </div>
  );
}

export default DetailView;
