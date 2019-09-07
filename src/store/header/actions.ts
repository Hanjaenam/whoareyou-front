import { ActionTypes } from './types';

export const TOGGLE_VISIBLE_POPOVER = 'header/TOGGLE_VISIBLE_POPOVER';
export const HIDE_USER_POPOVEER = 'header/HIDE_USER_POPOVER';
export const SET_CONTRACT_HEADER = 'header/SET_CONTRACT_HEADER';

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
