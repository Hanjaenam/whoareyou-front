import { ActionTypes } from './types';

export const TOGGLE_VISIBLE_POPOVER = 'header/TOGGLE_VISIBLE_POPOVER';
export const HIDE_USER_POPOVEER = 'header/HIDE_USER_POPOVER';
export const TOGGLE_CONTRACT_ASIDE = 'header/TOGGLE_CONTRACT_ASIDE';
export const SHOW_ASIDE_MODAL = 'header/SHOW_ASIDE_MODAL';
export const HIDE_ASIDE_MODAL = 'header/HIDE_ASIDE_MODAL';
export const SHOW_SEARCH_INPUT = 'header/SHOW_SEARCH_INPUT';
export const HIDE_SEARCH_INPUT = 'header/HIDE_SEARCH_INPUT';
export const SHOW_SEARCH_RESULT = 'header/SHOW_SEARCH_RESULT';
export const HIDE_SEARCH_RESULT = 'header/HIDE_SEARCH_RESULT';

export const toggleVisiblePopover = (): ActionTypes => ({
  type: TOGGLE_VISIBLE_POPOVER,
});
export const hideUserPopover = (): ActionTypes => ({
  type: HIDE_USER_POPOVEER,
});
export const toggleContractAside = (): ActionTypes => ({
  type: TOGGLE_CONTRACT_ASIDE,
});
export const showAsideModal = (): ActionTypes => ({
  type: SHOW_ASIDE_MODAL,
});
export const hideAsideModal = (): ActionTypes => ({
  type: HIDE_ASIDE_MODAL,
});
export const showSearchInput = (): ActionTypes => ({
  type: SHOW_SEARCH_INPUT,
});
export const hideSearchInput = (): ActionTypes => ({
  type: HIDE_SEARCH_INPUT,
});
export const showSearchResult = (): ActionTypes => ({
  type: SHOW_SEARCH_RESULT,
});
export const hideSearchResult = (): ActionTypes => ({
  type: HIDE_SEARCH_RESULT,
});
