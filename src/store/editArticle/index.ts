import { State, ActionTypes } from './types';
import { SET_EDIT_ARTICLE, CLEAN_EDIT_ARTICLE } from './actions';

const initialState: State = {
  id: -1,
  content: '',
  photos: [],
};

export default (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case SET_EDIT_ARTICLE:
      return action.payload;
    case CLEAN_EDIT_ARTICLE:
      return initialState;
    default:
      return state;
  }
};
