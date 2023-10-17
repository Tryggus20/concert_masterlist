import {takeEvery, put} from "redux-saga/effects"
import axios from "axios"

function* fetchListViewSaga() {
    try{
        // get goes here
    }catch (err) {
        console.log(err, "error in fetchListViewSaga");
    }
} 

function* concertSaga() {
yield takeEvery ("FETCH_LIST_VIEW", fetchListViewSaga); //double check this!

}

export default concertSaga