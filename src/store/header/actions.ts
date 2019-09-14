import { ActionTypes } from './types';

export const TOGGLE_VISIBLE_POPOVER = 'header/TOGGLE_VISIBLE_POPOVER';
export const HIDE_USER_POPOVEER = 'header/HIDE_USER_POPOVER';
export const TOGGLE_CREATE_ARTICLE = 'header/TOGGLE_CREATE_ARTICLE';
export const HIDE_CREATE_ARTICLE = 'header/HIDE_CREATE_ARTICLE';
export const TOGGLE_CONTRACT_ASIDE = 'header/TOGGLE_CONTRACT_ASIDE';
export const SHOW_ASIDE_MODAL = 'header/SHOW_ASIDE_MODAL';
export const HIDE_ASIDE_MODAL = 'header/HIDE_ASIDE_MODAL';

export const toggleVisiblePopover = (): ActionTypes => ({
  type: TOGGLE_VISIBLE_POPOVER,
});
export const hideUserPopover = (): ActionTypes => ({
  type: HIDE_USER_POPOVEER,
});
export const toggleCreateArticle = (): ActionTypes => ({
  type: TOGGLE_CREATE_ARTICLE,
});
export const hideCreateArticle = (): ActionTypes => ({
  type: HIDE_CREATE_ARTICLE,
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
