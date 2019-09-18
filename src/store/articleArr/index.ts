import { ActionTypes, State } from './types';
import { SET_ARTICLE_ARR } from './actions';

const initialState: State[] = [];

export default (state = initialState, action: ActionTypes): State[] => {
  switch (action.type) {
    case SET_ARTICLE_ARR:
      return action.payload;
    default:
      return state;
  }
};
