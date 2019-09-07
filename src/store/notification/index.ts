import { State, ActionTypes } from './types';
import { SET_MESSAGE, CLEAN_MESSAGE } from './actions';

const initialState: State = {
  type: null,
  value: null,
};

export default (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case SET_MESSAGE: {
      const { payload } = action;
      return payload;
    }
    case CLEAN_MESSAGE:
      return initialState;
    default:
      return state;
  }
};
