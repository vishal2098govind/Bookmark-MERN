import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { SUBJECTS_LOADED } from './types';

export const loadUserSubjects = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/subject');

    dispatch({
      type: SUBJECTS_LOADED,
      payload: res.data,
    });
  } catch (error) {}
};
