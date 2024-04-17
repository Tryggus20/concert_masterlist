import { combineReducers } from "redux";

const initialState = {
  loading: false,
  friends: [],
  error: null,
};

// Fetch Confirmed Friends list
// Fetch Pending Friends list
// Fetch Blocked Friends list // TODO: implement at a later time?

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FRIENDS":
      const newState = action.payload;
      return newState;

    default:
      return state;
  }
};

export default combineReducers({ friendsReducer });
