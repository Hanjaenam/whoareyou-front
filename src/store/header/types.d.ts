import {
  TOGGLE_VISIBLE_POPOVER,
  HIDE_USER_POPOVEER,
  TOGGLE_CONTRACT_ASIDE,
  HIDE_ASIDE_MODAL,
  SHOW_ASIDE_MODAL,
  SHOW_SEARCH_INPUT,
  HIDE_SEARCH_INPUT,
  SHOW_SEARCH_RESULT,
  HIDE_SEARCH_RESULT,
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

interface ShowSearchInput {
  type: typeof SHOW_SEARCH_INPUT;
}

interface HideSearchInput {
  type: typeof HIDE_SEARCH_INPUT;
}

interface ShowSearchResult {
  type: typeof SHOW_SEARCH_RESULT;
}

interface HideSearchResult {
  type: typeof HIDE_SEARCH_RESULT;
}

export type ActionTypes =
  | ToggleVisiblePopover
  | HideUserPopover
  | ToggleContractAside
  | ShowAsideModal
  | HideAsideModal
  | HideSearchInput
  | ShowSearchInput
  | HideSearchResult
  | ShowSearchResult;
// state
export interface State {
  visible: {
    userPopover: boolean;
    asideModal: boolean;
    header: boolean;
    createArticle: boolean;
    search: {
      input: boolean;
      result: boolean;
    };
  };
  contract: {
    aside: boolean;
  };
}
