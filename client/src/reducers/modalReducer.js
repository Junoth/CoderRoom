import { OPEN_LOGIN_MODAL, OPEN_SIGNUP_MODAL, CLOSE_MODAL} from '../actions/types';

const initialState = {
  currentModal: 'NULL'
}

export default function(state = initialState, action) {
  switch(action.type) {
    case OPEN_LOGIN_MODAL:
      return { currentModal: 'LOG_IN' }
    case OPEN_SIGNUP_MODAL:
      return { currentModal: 'SIGN_UP' }
    case CLOSE_MODAL:
      return { currentModal: 'NULL' }
    default:
      return state;
  }
}