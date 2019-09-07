import {
  TOGGLE_VISIBLE_POPOVER,
  TOGGLE_CONTRACT_ASIDE,
  SHOW_ASIDE_MODAL,
  HIDE_ASIDE_MODAL,
  HIDE_USER_POPOVEER,
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
  };
  contract: {
    aside: boolean;
  };
}
