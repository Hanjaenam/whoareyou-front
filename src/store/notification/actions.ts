import { SetMessagePayl, ActionTypes } from './types';

export const SET_MESSAGE = 'notification/setMessage';
export const CLEAN_MESSAGE = 'notification/cleanMessage';

export const setMessage = (payload: SetMessagePayl): ActionTypes => ({
  type: SET_MESSAGE,
  payload,
});

export const cleanMessage = (): ActionTypes => ({
  type: CLEAN_MESSAGE,
});
