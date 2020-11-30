import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import restaurantSaga from './restaurants.saga';
import newRestaurantSaga from './new.restaurant.saga';
import newReviewSaga from './new.review.saga';
import reviewSaga from './review.saga';
import detailsSaga from './details.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    restaurantSaga(),
    newRestaurantSaga(),
    newReviewSaga(),
    reviewSaga(),
    detailsSaga(),
  ]);
}
