import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// LIST VIEW
function* fetchListViewSaga() {
  try {
    const response = yield axios({
      method: "GET",
      url: "/api/concert/:id",
    });
    yield put({ type: "SET_LIST_VIEW", payload: response.data });
  } catch (err) {
    console.log(err, "error in fetchListViewSaga");
  }
}

// CARD VIEW
function* fetchCardViewSaga() {
  try {
    const response = yield axios({
      method: "GET",
      url: "/api/card/:id",
    });
    yield put({ type: "SET_CARD_VIEW", payload: response.data });
  } catch (err) {
    console.log(err, "error in fetchCardViewSaga");
  }
}

// DETAILED VIEW
function* fetchDetailedViewSaga() {
  try {
    const response = yield axios({
      method: "GET",
      url: "/api/detail/:id",
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
      url: `/api/concert/delete/:id`,
    });
    yield put({ type: "FETCH_CARD_VIEW" });
  } catch (err) {
    console.log(err, `error in "delete" request`);
  }
}

function* concertSaga() {
  yield takeEvery("FETCH_LIST_VIEW", fetchListViewSaga); //double check this!
  yield takeEvery("FETCH_CARD_VIEW", fetchCardViewSaga);
  yield takeEvery("FETCH_DETAIL_VIEW", fetchDetailedViewSaga);
  yield takeEvery("DELETE_CONCERT", deleteConcertSaga);
  
}

export default concertSaga;
