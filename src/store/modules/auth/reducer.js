import produce from 'immer';

const INITIAL_STATE = {
  user: {},
  signed: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.user = action.payload.user;
        draft.signed = true;
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        draft.signed = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.signed = false;
        draft.user = {};
        break;
      }
      default:
    }
  });
}
