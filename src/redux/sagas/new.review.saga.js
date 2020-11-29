import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postNewReview(action) {
  try {
    const response = yield axios.post('/api/reviews', action.payload);
    console.log(response.data);
    yield put({
      type: 'GET_REVIEWS',
    });
  } catch (err) {
    console.log('ERROR SAVING REVIEW', err);
    yield put({ type: 'POST_FAILED' });
  }
}

function* newReviewSaga() {
  yield takeLatest('POST_REVIEW', postNewReview);
}

export default newReviewSaga;
