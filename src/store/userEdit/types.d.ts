import { SET_EDIT_TYPE } from './actions';

export type SetEditTypePayl = 'profile' | 'password';

interface SetEditType {
  type: typeof SET_EDIT_TYPE;
  payload: SetEditTypePayl;
}

export type ActionTypes = SetEditType;

export interface State {
  editType: 'profile' | 'password';
}
