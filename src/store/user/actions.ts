import { ActionTypes, LogInPayl, PatchPayl, PushFollowPayl, RemoveFollowPayl } from './types';

export const LOG_IN = 'global/LOG_IN';
export const LOG_OUT = 'global/LOG_OUT';
export const PATCH = 'global/PATCH';
export const PUSH_FOLLOW = 'global/PUSH_FOLLOW';
export const REMOVE_FOLLOW = 'global/REMOVE_FOLLOW';

export const logIn = (payload: LogInPayl): ActionTypes => ({
  type: LOG_IN,
  payload,
});
export const logOut = (): ActionTypes => ({ type: LOG_OUT });

export const patchUser = (payload: PatchPayl) => ({
  type: PATCH,
  payload,
});

export const PushFollow = (payload: PushFollowPayl) => ({ type: PUSH_FOLLOW, payload });
export const RemoveFollow = (payload: RemoveFollowPayl) => ({ type: REMOVE_FOLLOW, payload });
