import {
  TOGGLE_VISIBLE_POPOVER,
  HIDE_USER_POPOVEER,
  SET_CONTRACT_HEADER,
} from './actions';

interface ToggleVisiblePopover {
  type: typeof TOGGLE_VISIBLE_POPOVER;
}
interface HideUserPopover {
  type: typeof HIDE_USER_POPOVEER;
}
interface SetContractHeader {
  type: typeof SET_CONTRACT_HEADER;
  payload: boolean;
}
export type ActionTypes =
  | ToggleVisiblePopover
  | HideUserPopover
  | SetContractHeader;
// state
export interface State {
  visible: {
    userPopover: boolean;
    asideModal: boolean;
  };
  contract: boolean;
}
