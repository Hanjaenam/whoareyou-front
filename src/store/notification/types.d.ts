import { SET_MESSAGE, CLEAN_MESSAGE } from './actions';

// payload
export interface SetMessagePayl {
  type: 'danger' | 'success';
  value: string;
}
// action
interface SetMessage {
  type: typeof SET_MESSAGE;
  payload: SetMessagePayl;
}
interface CleanMessage {
  type: typeof CLEAN_MESSAGE;
}
export type ActionTypes = SetMessage | CleanMessage;
// state
export interface State {
  type: 'danger' | 'success' | null;
  value: string | null;
}
