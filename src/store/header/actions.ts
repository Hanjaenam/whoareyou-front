import { ActionTypes } from './types';

export const TOGGLE_VISIBLE_POPOVER = 'header/TOGGLE_VISIBLE_POPOVER';
export const HIDE_USER_POPOVEER = 'header/HIDE_USER_POPOVER';
export const SET_CONTRACT_HEADER = 'header/SET_CONTRACT_HEADER';
export const TOGGLE_CREATE_ARTICLE = 'header/TOGGLE_CREATE_ARTICLE';
export const HIDE_CREATE_ARTICLE = 'header/HIDE_CREATE_ARTICLE';

export const toggleVisiblePopover = (): ActionTypes => ({
  type: TOGGLE_VISIBLE_POPOVER,
});
export const hideUserPopover = (): ActionTypes => ({
  type: HIDE_USER_POPOVEER,
});
export const setContractHeader = (payload: boolean): ActionTypes => ({
  type: SET_CONTRACT_HEADER,
  payload,
});
export const toggleCreateArticle = (): ActionTypes => ({
  type: TOGGLE_CREATE_ARTICLE,
});
export const hideCreateArticle = (): ActionTypes => ({
  type: HIDE_CREATE_ARTICLE,
});
