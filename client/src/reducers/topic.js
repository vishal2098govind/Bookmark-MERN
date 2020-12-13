import { TOPICS_LOADED, TOPICS_FOR_A_SUBJECT_LOADED } from '../actions/types';

const initialState = {
  topics: [],
  topicsForSub: [],
};

const topicReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOPICS_LOADED:
      return {
        ...state,
        topics: payload,
      };

    case TOPICS_FOR_A_SUBJECT_LOADED:
      return {
        ...state,
        topicsForSub: payload,
      };
    default:
      return state;
  }
};

export default topicReducer;
