import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// Detail VIEW
function* fetchDetailViewSaga(action) {
  //need user_concerts.id
  try {
    const response = yield axios({
      method: "GET",
      url: `/api/concerts/detail/${action.payload.id}`,
    });
    yield put({ type: "SET_DETAIL_VIEW", payload: response.data });
  } catch (err) {
    console.log(err, "error in fetchDetailViewSaga");
  }
}

// LIST VIEW
function* fetchListViewSaga(action) {
  try {
    const response = yield axios({
      method: "GET",
      url: `/api/concerts/${action.payload.id}`,
    });
    yield put({ type: "SET_LIST_VIEW", payload: response.data });
  } catch (err) {
    console.log(err, "error in fetchListViewSaga");
  }
}

// CARD VIEW
function* fetchCardViewSaga(action) {
  try {
    const response = yield axios({
      method: "GET",
      url: `/api/concerts/card/${action.payload.id}`,
    });
    yield put({ type: "SET_CARD_VIEW", payload: response.data });
  } catch (err) {
    // console.log("fetchCardViewSaga error", user);
    console.log(err, "error in fetchCardViewSaga");
  }
}

// DETAILED VIEW
function* fetchDetailedViewSaga(action) {
  // TODO: This should be the USER_CONCERTS.ID
  try {
    const response = yield axios({
      method: "GET",
      url: `/api/concerts/detail/${action.payload.id}`,
    });
    yield put({ type: "SET_DETAIL_VIEW", payload: response.data });
  } catch (err) {
    console.log(err, "error in fetchDetailViewSaga");
  }
}

// TODO: will need to double check action.payload is just the user_concert.id
function* deleteConcertSaga(action) {
  try {
    yield axios({
      method: "PUT",
      url: `/api/concerts/delete/${action.payload.id}`,
    });
    yield put({ type: "FETCH_CARD_VIEW" });
  } catch (err) {
    console.log(err, `error in "delete" request`);
  }
}

// UPDATE CONCERT           TODO: figure out if I need to pass anything
function* updateConcertSaga() {
  try {
    const response = yield axios({
      method: "PUT",
      url: "/api/update/:id",
    });
  } catch (err) {
    console.log(err, "error in updateConcertSaga");
  }
}

// ADDING NEW CONCERT
function* addConcertSaga(action) {
  const newConcert = action.payload;
  try {
    yield axios.post(
      `/api/concerts/add-concert/${action.payload.id}`,
      newConcert
    );
    yield put({ type: "FETCH_CARD_VIEW" });
  } catch (err) {
    console.log("error in addConcertSaga", err, action.payload);
  }
}

// Editing Concert
function* editConcertSaga(action) {
  console.log("editConcertSaga action payload:", action.payload);
  try {
    const response = yield axios({
      method: "PUT",
      url: `/api/edit/${action.payload.concertId.id}`,
      payload: action.payload, 
    });
  } catch (err) {
    console.log(err, "error in editConcertSaga", action.payload);
  }
}

function* concertSaga() {
  yield takeEvery("FETCH_LIST_VIEW", fetchListViewSaga);
  yield takeEvery("FETCH_CARD_VIEW", fetchCardViewSaga);
  yield takeEvery("FETCH_DETAIL_VIEW", fetchDetailedViewSaga);
  yield takeEvery("DELETE_CONCERT", deleteConcertSaga);
  yield takeEvery("UPDATE_CONCERT", updateConcertSaga);
  yield takeEvery("FETCH_DETAIL_VIEW", fetchDetailViewSaga);
  yield takeEvery("ADD_CONCERT", addConcertSaga);
  yield takeEvery("EDIT_CONCERT", editConcertSaga);
}

export default concertSaga;
