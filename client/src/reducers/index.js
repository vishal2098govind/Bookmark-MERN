import { combineReducers } from 'redux';
import authReducer from './auth';
import alertReducer from './alert';
import subjectReducer from './subject';
import topicReducer from './topic';
import subtopicReducer from './subtopic';
import bookmarkReducer from './bookmark';

export default combineReducers({
  authReducer,
  alertReducer,
  subjectReducer,
  topicReducer,
  subtopicReducer,
  bookmarkReducer,
});
