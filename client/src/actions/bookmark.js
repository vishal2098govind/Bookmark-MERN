import { BOOKMARKS_FOR_A_SUBTOPIC_LOADED } from './types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

export const getBookmarksForASubtopic = (
  subId,
  tpId,
  subTpId
) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/api/bookmark/${subId}/${tpId}/${subTpId}`);

    dispatch({
      type: BOOKMARKS_FOR_A_SUBTOPIC_LOADED,
      payload: res.data,
    });
  } catch (error) {}
};
