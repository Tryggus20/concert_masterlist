import { combineReducers } from "redux";

const spotifyReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_SPOTIFY_DATA":
        return [...state, action.payload];
      
      default:
        return state;
    }
  };
  
  export default combineReducers({ spotifyReducer });