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

function* updateReview(action) {
  try {
    const response = yield axios.put(
      `/api/reviews/${action.payload.reviewId}`,
      action.payload
    );
    yield put({
      type: 'GET_REVIEWS',
    });
  } catch (err) {
    console.log('ERROR UPDATING REVIEW', err);
    yield put({ type: 'PUT_FAILED' });
  }
}

function* deleteReview(action) {
  try {
    yield axios.delete(`/api/reviews/${action.payload.reviewId}`);
    yield put({
      type: 'GET_DETAILS',
      payload: action.payload.restaurantId,
    });
  } catch (err) {
    console.log('ERROR DELETING REVIEW', err);
    yield put({ type: 'DELETE_FAILED' });
  }
}

function* reviewSaga() {
  yield takeLatest('GET_REVIEWS', getReviews);
  yield takeLatest('UPDATE_REVIEW', updateReview);
  yield takeLatest('DELETE_REVIEW', deleteReview);
}

export default reviewSaga;
