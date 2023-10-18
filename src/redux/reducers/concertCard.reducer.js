import { combineReducers } from "redux";

const concertCardReducer = (state = [] , action) => {
    console.log("IN___________ ConcertCardReducer", action, action.type);
  switch (action.type) {
    case "SET_CARD_VIEW":
      return action.payload;
      case "ADD_CONCERT":
        return [...state, action.payload]
    
    default:
      return state;
  }
};

export default combineReducers({ concertCardReducer });
