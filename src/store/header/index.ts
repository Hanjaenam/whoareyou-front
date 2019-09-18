import { State, ActionTypes } from './types';
import {
  TOGGLE_VISIBLE_POPOVER,
  HIDE_USER_POPOVEER,
  TOGGLE_CONTRACT_ASIDE,
  HIDE_ASIDE_MODAL,
  SHOW_ASIDE_MODAL,
} from './actions';

const initialState: State = {
  visible: {
    userPopover: false,
    asideModal: false,
    header: false,
    createArticle: false,
  },
  contract: {
    aside: false,
  },
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
    case TOGGLE_CONTRACT_ASIDE:
      return {
        ...state,
        contract: {
          aside: !state.contract.aside,
        },
      };
    case SHOW_ASIDE_MODAL:
      return {
        ...state,
        visible: {
          ...state.visible,
          asideModal: true,
        },
      };
    case HIDE_ASIDE_MODAL:
      return {
        ...state,
        visible: {
          ...state.visible,
          asideModal: false,
        },
      };
    default:
      return state;
  }
};
