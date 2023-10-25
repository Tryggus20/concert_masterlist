import { combineReducers } from "redux";

const spotifyReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_SPOTIFY_DATA":
      return {
        ...state,
        [action.payload.bandName]: action.payload.artistId,
      };f
    default:
      return state;
  }
};

export default combineReducers({ spotifyReducer });
