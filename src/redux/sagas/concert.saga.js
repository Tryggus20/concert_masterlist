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
function* fetchCardViewSaga(user) {
  try {
    console.log("fetchCardViewSaga*&*&*&*&*&*&", user);
    const response = yield axios({
      method: "GET",
      url: `/api/concerts/card/${user.id}`,
    });
    yield put({ type: "SET_CARD_VIEW", payload: response.data });
  } catch (err) {
    console.log("fetchCardViewSaga error", user);
    console.log(err, "error in fetchCardViewSaga");
  }
}

// DETAILED VIEW
function* fetchDetailedViewSaga() {
  try {
    const response = yield axios({
      method: "GET",
      url: "/api/concerts/detail/:id",
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
      url: `/api/concerts/delete/:id`,
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

function* concertSaga() {
  yield takeEvery("FETCH_LIST_VIEW", fetchListViewSaga); //double check this!
  yield takeEvery("FETCH_CARD_VIEW", fetchCardViewSaga);
  yield takeEvery("FETCH_DETAIL_VIEW", fetchDetailedViewSaga);
  yield takeEvery("DELETE_CONCERT", deleteConcertSaga);
  yield takeEvery("UPDATE_CONCERT", updateConcertSaga)

}

export default concertSaga;
