import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SpotifyPlayer from "../SpotifyPlayer/SpotifyPlayer";
import DetailBand from "../DetailBand/DetailBand";
const Swal = require('sweetalert2')



function DetailView() {
  const id = useParams().id;
  const history = useHistory();
  const dispatch = useDispatch();
  // Selector to get info from store
  const user = useSelector((store) => store.user);
  const concertDetails = useSelector(
    (store) => store.concertDetail.concertDetailReducer
  );

  const spotifyData = useSelector((store) => store.spotifyReducer);
  // TODO: In detail view, if no image, auto generate a photo?
  useEffect(() => {
    dispatch({ type: "FETCH_DETAIL_VIEW", payload: { id } });
  }, []);

  

  const handleDelete = (event) => {
    event.preventDefault();
        Swal.fire({
          title: "Are you sure? This can't be undone",
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
        }) .then((result) => {
          if (result.isConfirmed) {
            dispatch({ type: "DELETE_CONCERT", payload: { id } });
            history.push(`/home`);
          }});
  };
  if (concertDetails.length === 0) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  console.log(concertDetails)
  return (
    <div>
      <div>
      <h1>Concert Recap</h1>
      <div className="detailVenue">
      <p>{new Date(concertDetails[0]?.date).toLocaleDateString()}</p>

      <p className="">{concertDetails[0].venue} in  {concertDetails[0].city}, {concertDetails[0].state}</p>
      </div>
      
       </div>
      {/* Details View starts here!!!!!! */}
      <div className="detailContainer">
      {concertDetails.map((item, index) => (

<DetailBand bandpictures={item.bandpictures} />
))}
      </div>
      {/* Details View ends here !!!!!! */}
      <p style={{textAlign: "center"}}>
      <button onClick={() => history.push(`/edit/${id}`)}>Edit</button>  {""}
       <button onClick={handleDelete}>Delete Concert</button>  </p>
      <br />
      <br />
      <br />
      <button onClick={history.goBack}>Back</button>
    </div>
  );
}

export default DetailView;
