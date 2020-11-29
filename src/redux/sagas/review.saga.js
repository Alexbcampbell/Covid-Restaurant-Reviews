import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getReviews(action) {
  try {
    const response = yield axios.get('/api/reviews');
    yield put({
      type: 'SET_REVIEWS',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR GETTING REVIEWS', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* reviewSaga() {
  yield takeLatest('GET_REVIEWS', getReviews);
}

export default reviewSaga;
