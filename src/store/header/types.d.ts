import {
  TOGGLE_VISIBLE_POPOVER,
  HIDE_USER_POPOVEER,
  SET_CONTRACT_HEADER,
  TOGGLE_CREATE_ARTICLE,
  HIDE_CREATE_ARTICLE,
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
interface ToggleCreateArticle {
  type: typeof TOGGLE_CREATE_ARTICLE;
}
interface HideCreateArticle {
  type: typeof HIDE_CREATE_ARTICLE;
}
export type ActionTypes =
  | ToggleVisiblePopover
  | HideUserPopover
  | SetContractHeader
  | ToggleCreateArticle
  | HideCreateArticle;
// state
export interface State {
  visible: {
    userPopover: boolean;
    asideModal: boolean;
  };
  contract: boolean;
  createArticle: boolean;
}
