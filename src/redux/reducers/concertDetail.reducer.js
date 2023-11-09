import { combineReducers } from "redux";

const concertDetailReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_DETAIL_VIEW":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({ concertDetailReducer });
