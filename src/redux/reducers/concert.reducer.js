import { combineReducers } from "redux";

const concertReducer = (state = [], action) => {
    switch  (action.type) {
        case "FETCH_LIST_VIEW":
            return action.payload;
            // case 
    }
}

export default combineReducers ({concertReducer})