import {
  SUBTOPICS_FOR_A_TOPIC_LOADED,
  SUBTOPICS_LOADED,
} from '../actions/types';

const initialState = {
  subtopics: [],
  subtopicsForTp: [],
};

const subtopicReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SUBTOPICS_LOADED:
      return {
        ...state,
        subtopics: payload,
      };

    case SUBTOPICS_FOR_A_TOPIC_LOADED:
      return {
        ...state,
        subtopicsForTp: payload,
      };

    default:
      return state;
  }
};

export default subtopicReducer;
