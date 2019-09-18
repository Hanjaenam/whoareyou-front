import {
  TOGGLE_VISIBLE_POPOVER,
  HIDE_USER_POPOVEER,
  TOGGLE_CONTRACT_ASIDE,
  HIDE_ASIDE_MODAL,
  SHOW_ASIDE_MODAL,
} from './actions';

interface ToggleVisiblePopover {
  type: typeof TOGGLE_VISIBLE_POPOVER;
}
interface HideUserPopover {
  type: typeof HIDE_USER_POPOVEER;
}
interface ToggleContractAside {
  type: typeof TOGGLE_CONTRACT_ASIDE;
}
interface ShowAsideModal {
  type: typeof SHOW_ASIDE_MODAL;
}
interface HideAsideModal {
  type: typeof HIDE_ASIDE_MODAL;
}

export type ActionTypes =
  | ToggleVisiblePopover
  | HideUserPopover
  | ToggleContractAside
  | ShowAsideModal
  | HideAsideModal;
// state
export interface State {
  visible: {
    userPopover: boolean;
    asideModal: boolean;
    header: boolean;
    createArticle: boolean;
  };
  contract: {
    aside: boolean;
  };
}
