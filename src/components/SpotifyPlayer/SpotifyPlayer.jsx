import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";


export default function SpotifyPlayer({band}){
    const dispatch = useDispatch();
useEffect(() => {
    console.log('spotify band:', band);
    dispatch({ type: "GET_ARTIST_SPOTIFY_ID", payload: band });
}, [band])

const artistIds = useSelector((state) => state.spotifyData); 

    return(<>  <iframe
        src={`https://open.spotify.com/embed/artist/${artistId}`}
        width="350"
        height="360"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        ></iframe></>)
}



