import React, { useEffect, useState } from "react";
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
  const [featuredPic, setFeaturedPic] = useState("");
  const concertDetails = useSelector(
    (store) => store.concertDetail.concertDetailReducer
  );

  const spotifyData = useSelector((store) => store.spotifyReducer);
  // TODO: In detail view, if no image, auto generate a photo?
  useEffect(() => {
    dispatch({ type: "FETCH_DETAIL_VIEW", payload: { id } });
  }, []);

  useEffect(() => {
    setFeaturedPic(concertDetails[0]?.bandpictures[0].pictureUrls[0]);
  }, [concertDetails]);
  const handleImageClick = (imageUrl) => {
    setFeaturedPic(imageUrl);
};
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
              <img
                src={featuredPic}
                alt="Large Image"
                style={{ maxHeight: "800px", maxWidth: "800px" }}
              ></img>
              <SpotifyPlayer band={bandpictures.band} />
              <br />
              {bandpictures.pictureUrls?.map((pictures, index) => (
                <>
                  <img
                    src={pictures}
                    onClick={() => handleImageClick(pictures)}                    alt="Error loading image"
                    style={{ maxHeight: "80px", maxWidth: "80px" }}
                  />
                </>
              ))}
              {/* Will need to componentize spotify player. pass along bandName and do a 
              GET search for that artist, returning first result to get artist.id.
               then another GET request for artist top song or top 3 songs  */}

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
