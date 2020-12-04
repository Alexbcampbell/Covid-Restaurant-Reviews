const restaurantDetailsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default restaurantDetailsReducer;
