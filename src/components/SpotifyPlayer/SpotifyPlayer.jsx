import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";


export default function SpotifyPlayer({band}){
    console.log(band)
    const artistId = useSelector(store => store.spotifyReducer.spotifyReducer[band]?.artistId);
    console.log(artistId)
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('spotify band:', band);
        dispatch({ type: "GET_ARTIST_SPOTIFY_ID", payload: band });
        console.log("artistID for spotify", artistId);
    }, [dispatch, band])

    return(
    <>  <iframe
        src={`https://open.spotify.com/embed/artist/${artistId}`}
        width="350"
        height="360"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        ></iframe></>)
}



