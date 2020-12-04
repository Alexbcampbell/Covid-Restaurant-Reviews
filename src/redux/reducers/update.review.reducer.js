const updateReviewReducer = (state = [], action) => {
  switch (action.type) {
    case 'PUT_REVIEWS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default updateReviewReducer;
