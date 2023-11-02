import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export default function SpotifyPlayer({ band }) {
  const artistId = useSelector(
    (store) => store.spotifyReducer.spotifyReducer[band]?.artistId
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_ARTIST_SPOTIFY_ID", payload: band });
  }, [dispatch, band]);
// just a component holder for the spotify player so it can be called for each band
  return (
    <div className="spotifyPlayer">
      {" "}
      <iframe
        src={`https://open.spotify.com/embed/artist/${artistId}`}
        width="350"
        height="350"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
}
