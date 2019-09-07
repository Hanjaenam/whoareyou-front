import { State, ActionTypes } from './types';
import {
  TOGGLE_VISIBLE_POPOVER,
  HIDE_USER_POPOVEER,
  SET_CONTRACT_HEADER,
} from './actions';

const initialState: State = {
  visible: {
    userPopover: false,
    asideModal: false,
  },
  contract: false,
};
export default (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case TOGGLE_VISIBLE_POPOVER:
      return {
        ...state,
        visible: { ...state.visible, userPopover: !state.visible.userPopover },
      };
    case HIDE_USER_POPOVEER:
      return {
        ...state,
        visible: { ...state.visible, userPopover: false },
      };
    case SET_CONTRACT_HEADER:
      return {
        ...state,
        contract: action.payload,
      };
    default:
      return state;
  }
};
