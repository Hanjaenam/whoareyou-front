import { ActionTypes, State } from './types';
import {
  SET_ARTICLE_ARR,
  REMOVE_ARTICLE,
  CREATE_COMMENT,
  REMOVE_COMMENT,
  SET_COMMENT,
} from './actions';

const initialState: State[] = [];

export default (state = initialState, action: ActionTypes): State[] => {
  switch (action.type) {
    case SET_ARTICLE_ARR:
      return action.payload;
    case REMOVE_ARTICLE: {
      const { payload } = action;
      return state.filter((_, index) => index !== payload);
    }
    case CREATE_COMMENT: {
      const { index, ...rest } = action.payload;
      return state.map((value, _index) =>
        index !== _index ? value : { ...value, comments: [...value.comments, rest] },
      );
    }
    case REMOVE_COMMENT: {
      const { index, id } = action.payload;
      return state.map((value, _index) =>
        index !== _index
          ? value
          : { ...value, comments: value.comments.filter(comment => comment.id !== id) },
      );
    }
    case SET_COMMENT: {
      const { index, comments } = action.payload;
      return state.map((value, _index) => (index !== _index ? value : { ...value, comments }));
    }
    default:
      return state;
  }
};
