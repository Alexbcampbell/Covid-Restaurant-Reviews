const initialState = {
  lat: 0,
  lng: 0,
  updateNeeded: false,
};

const cordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CORD':
      return { ...action.payload };
    case 'MAP_FORCE_UPDATE_ENFORCED':
      return { ...state, updateNeeded: false };
    default:
      return state;
  }
};

export default cordsReducer;
