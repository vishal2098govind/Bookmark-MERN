import { SET_ALERT, REMOVE_ALERT } from './types';

import { v4 } from 'uuid';

const setAlert = (msg, type, timeout = 5000) => async dispatch => {
  const id = v4();
  console.log(msg);

  dispatch({
    type: SET_ALERT,
    payload: { id, msg, type },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export default setAlert;
