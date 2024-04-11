import { takeEvery, call, put } from 'redux-saga/effects';
import { uploadImageToS3 } from 'api/aws';

function* uploadImageSaga(action) {
  const { file, bandIndex } = action;
  try {
    const uploadUrl = yield call(uploadImageToS3, file);
    yield put(uploadPictureRequest(bandIndex, uploadUrl));
  } catch (error) {
    yield put({ type: 'UPLOAD_IMAGE_FAILURE', error });
  }
}

export default function* imageUploadSaga() {
  yield takeEvery('UPLOAD_PICTURE_REQUEST', uploadImageSaga);
}
