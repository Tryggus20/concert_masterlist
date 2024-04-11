import { combineReducers } from "redux";

const initialState = {
  uploading: false,
  error: null,
};

const cloudinaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_PICTURE_REQUEST":
      return { ...state, uploading: true, error: null };

    case "UPLOAD_PICTURE_SUCCESS":
      return { ...state, uploading: false, error: null };

    case "UPLOAD_PICTURE_FAILURE":
      return { ...state, uploading: false, error: action.payload };

    default:
      return state;
  }
};
export default combineReducers({ cloudinaryReducer });
