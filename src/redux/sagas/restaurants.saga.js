import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getRestaurants(action) {
  try {
    const response = yield axios.get('/api/restaurants');
    yield put({
      type: 'SET_RESTAURANTS',
      payload: response.data,
    });
  } catch (err) {
    console.log('ERROR GETTING RESTAURANTS', err);
    yield put({ type: 'GET_FAILED' });
  }
}

function* restaurantSaga() {
  yield takeLatest('GET_RESTAURANTS', getRestaurants);
}

export default restaurantSaga;
