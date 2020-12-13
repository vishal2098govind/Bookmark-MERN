import { SUBJECTS_LOADED, SUBTOPICS_FOR_A_TOPIC_LOADED } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const getSubtopicsForATopic = (subId, tpId) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/api/subtopic/${subId}/${tpId}`);

    dispatch({
      type: SUBTOPICS_FOR_A_TOPIC_LOADED,
      payload: res.data,
    });
  } catch (error) {}
};

export const getSubtopics = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/subtopic/');
    dispatch({
      type: SUBJECTS_LOADED,
      payload: res.data,
    });
  } catch (error) {}
};
