// import { put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';

// function* deleteReview(action) {
//   try {
//     yield axios.delete(`/api/reviews/${action.payload}`);
//     yield put({
//       type: 'GET_REVIEWS',
//     });
//   } catch (err) {
//     console.log('ERROR UPDATING REVIEW', err);
//     yield put({ type: 'PUT_FAILED' });
//   }
// }

// function* deleteReviewSaga() {
//   yield takeLatest('DELETE_REVIEW', deleteReview);
// }

// export default deleteReviewSaga;
