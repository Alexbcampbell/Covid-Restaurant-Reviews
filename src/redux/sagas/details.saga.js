import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getDetails(action) {
  console.log('HELLO');
  try {
    //gets movie details
    const response = yield axios.get(
      `/api/restaurantDetails/details/${action.payload}`
    );
    //gets genre details
    const dbResponse = yield axios.get(
      `/api/reviews/details/${action.payload}`
    );
    console.log(response.data);
    yield put({
      type: 'SET_DETAILS',
      payload: { ...response.data[0], reviews: dbResponse.data },
    });
  } catch (err) {
    console.log(err);
  }
}

function* detailsSaga() {
  yield takeLatest('GET_DETAILS', getDetails);
}

export default detailsSaga;
