import { combineReducers } from "redux";

const concertReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_LIST_VIEW":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({ concertReducer });
