import { BOOKMARKS_FOR_A_SUBTOPIC_LOADED } from '../actions/types';

const initialState = {
  bookmarkForSubTp: [],
};

const bookmarkReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case BOOKMARKS_FOR_A_SUBTOPIC_LOADED:
      return {
        ...state,
        bookmarkForSubTp: payload,
      };
    default:
      return state;
  }
};

export default bookmarkReducer;
