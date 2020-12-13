const { SET_ALERT, REMOVE_ALERT } = require('../actions/types');

const initialState = [];

const alertReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_ALERT:
      console.log(payload);
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
};

export default alertReducer;
