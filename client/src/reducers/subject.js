import { SUBJECTS_LOADED } from '../actions/types';

const initialState = [];

const subjectReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SUBJECTS_LOADED:
      return payload;
    default:
      return state;
  }
};

export default subjectReducer;
