import { SetEditTypePayl, ActionTypes } from './types';

export const SET_EDIT_TYPE = 'userEdit/SET_EDIT_TYPE';

export const setEditType = (payload: SetEditTypePayl): ActionTypes => ({
  type: SET_EDIT_TYPE,
  payload,
});
