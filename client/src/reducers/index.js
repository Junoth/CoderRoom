import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import modalReducer from './modalReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  modals: modalReducer,
  profile: profileReducer,
  post: postReducer
});