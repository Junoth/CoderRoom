import { OPEN_LOGIN_MODAL } from './types';
import { OPEN_SIGNUP_MODAL } from './types';
import { CLOSE_MODAL } from './types';

// Open Login Modal
export const openLoginModal = () => dispatch => {
  dispatch({
    type: OPEN_LOGIN_MODAL
  });
};

// Open Signup Modal
export const openSignupModal = () => dispatch => {
  dispatch({
    type: OPEN_SIGNUP_MODAL
  });
};

// Close Modal
export const closeModal = () => dispatch => {
  dispatch({
    type: CLOSE_MODAL
  });
};