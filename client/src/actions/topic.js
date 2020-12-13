import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { TOPICS_FOR_A_SUBJECT_LOADED, TOPICS_LOADED } from './types';

export const getAllTopics = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = axios.get('/topic');

    dispatch({
      type: TOPICS_LOADED,
      payload: res.data,
    });
  } catch (error) {}
};

export const getTopicsForASubject = subId => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/api/topic/sub/${subId}`);

    console.log(res.data);
    dispatch({
      type: TOPICS_FOR_A_SUBJECT_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};
