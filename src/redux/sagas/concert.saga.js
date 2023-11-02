import { takeEvery, put, all, call } from "redux-saga/effects";
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
    console.log(err, "error in fetchCardViewSaga");
  }
}

// DETAILED VIEW
function* fetchDetailedViewSaga(action) {
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
// Delete concert
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

// Editing Concert info
function* editConcertSaga(action) {
  try {
    const response = yield axios({
      method: "PUT",
      url: `/api/edit/${action.payload.userConcertId}`,
      data: action.payload,
    });
  } catch (err) {
    console.log(err, "error in editConcertSaga", action.payload);
  }
}
// Edit Band info
function* editBandNameSaga(action) {
  try {
    const response = yield axios({
      method: "PUT",
      url: `/api/update/`,
      data: action.payload,
    });
    console.log("action payload for editband name", action.payload);
  } catch (err) {
    console.log(err, "error in editBandNameSaga", action.payload);
  }
}
// Getting band id from spotify api
function* getArtistSpotifyIdSaga(action) {
  try {
    const response = yield axios({
      method: "GET",
      url: `/api/spotify/search-artist/${action.payload}`, 
    });
    yield put({ 
      type: "SET_SPOTIFY_DATA", 
      payload: { bandName: action.payload, artistId: response.data } 
    });  } catch (err) {
    console.log(err, "error in spotify getArtistSpotifyId");
  }
}

function* concertSaga() {
  yield takeEvery("FETCH_LIST_VIEW", fetchListViewSaga);
  yield takeEvery("FETCH_CARD_VIEW", fetchCardViewSaga);
  yield takeEvery("FETCH_DETAIL_VIEW", fetchDetailedViewSaga);
  yield takeEvery("DELETE_CONCERT", deleteConcertSaga);
  yield takeEvery("FETCH_DETAIL_VIEW", fetchDetailViewSaga);
  yield takeEvery("ADD_CONCERT", addConcertSaga);
  yield takeEvery("EDIT_CONCERT", editConcertSaga);
  yield takeEvery("EDIT_BAND_NAME", editBandNameSaga);
  yield takeEvery("GET_ARTIST_SPOTIFY_ID", getArtistSpotifyIdSaga);
}

export default concertSaga;
