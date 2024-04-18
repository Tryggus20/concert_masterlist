// src/redux/sagas/friendsSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchFriendsSaga(action) {
  try {
    console.log("friendsSaga", action.payload);
    const response = yield axios.get(`/api/friends/${action.payload}`);
    console.log("fetching friends saga");
    yield put({
      type: "SET_FRIENDS",
      payload: response.data 
    });
    console.log("friends saga data", response.data);
  } catch (error) {
    console.log("error", error);
  }
}

export default function* watchFetchFriends() {
  yield takeLatest("FETCH_FRIENDS", fetchFriendsSaga);
}
