import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postNewRestaurant(action) {
  try {
    const response = yield axios.post('/api/restaurants', action.payload);
    console.log(response.data);
    yield put({
      type: 'GET_RESTAURANTS',
    });
  } catch (err) {
    console.log('ERROR SAVING RESTAURANT', err);
    yield put({ type: 'POST_FAILED' });
  }
}

function* newRestaurantSaga() {
  yield takeLatest('POST_RESTAURANT', postNewRestaurant);
}

export default newRestaurantSaga;
