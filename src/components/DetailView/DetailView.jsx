import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

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

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <h4>Concert Recap (DetailView):</h4>
      {/* Details View starts here!!!!!! */}
      {concertDetails.map((concertDetail, index) => (
        <>
          <p>{new Date(concertDetail?.date).toLocaleDateString()}</p>
          <hr />

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
              <iframe
                src="https://open.spotify.com/embed/artist/7w9jdhcgHNdiPeNPUoFSlx?si=NNuVFC3GRVKKWSnATYK-CQ"
                width="300"
                height="380"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>

              <hr />
            </>
          ))}
          <p>{concertDetail.venue}</p>
          <p>
            {" "}
            {concertDetail.city}, {concertDetail.state}
          </p>
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
