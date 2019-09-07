import { ActionTypes, State } from './types';
import { SET_EDIT_TYPE } from './actions';

const defaultState: State = {
  editType: 'profile',
};

export default (state = defaultState, action: ActionTypes): State => {
  switch (action.type) {
    case SET_EDIT_TYPE:
      return { editType: action.payload };
    default:
      return state;
  }
};
