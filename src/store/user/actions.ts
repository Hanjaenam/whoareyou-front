import { ActionTypes, LogInPayl, PatchPayl } from './types';

export const LOG_IN = 'global/LOG_IN';
export const LOG_OUT = 'global/LOG_OUT';
export const PATCH = 'global/PATCH';

export const logIn = (payload: LogInPayl): ActionTypes => ({
  type: LOG_IN,
  payload,
});
export const logOut = (): ActionTypes => ({ type: LOG_OUT });

export const patchUser = (payload: PatchPayl) => ({
  type: PATCH,
  payload,
});
