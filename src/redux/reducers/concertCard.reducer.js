import { combineReducers } from "redux";

const concertCardReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CARD_VIEW":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({ concertCardReducer });
