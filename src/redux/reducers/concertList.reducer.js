import { combineReducers } from "redux";

const concertListReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_LIST_VIEW":
     const newState= action.payload
      return newState;
      // case "ADD_CONCERT":
      //   return [...state, action.payload]
    
    default:
      return state;
  }
};

export default combineReducers({ concertListReducer });
