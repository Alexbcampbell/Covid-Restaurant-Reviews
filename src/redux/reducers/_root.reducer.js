import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import accessReducer from './access.reducer';
import restaurantReducer from './restaurant.reducer';
import reviewReducer from './review.reducer';
import restaurantDetailsReducer from './details.reducer';
import cordsReducer from './cord.reducer';
import updateReviewReducer from './update.review.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  accessReducer,
  restaurantReducer,
  reviewReducer,
  restaurantDetailsReducer,
  cordsReducer,
  updateReviewReducer,
});

export default rootReducer;
