import { ActionTypes, State } from './types';
import { SET_ARTICLE_ARR, REMOVE_ARTICLE } from './actions';

const initialState: State[] = [];

export default (state = initialState, action: ActionTypes): State[] => {
  switch (action.type) {
    case SET_ARTICLE_ARR:
      return action.payload;
    case REMOVE_ARTICLE: {
      const { payload } = action;
      return state.filter((_, index) => index !== payload);
    }
    default:
      return state;
  }
};
