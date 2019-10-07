import { fromJS } from 'immutable';
import { ActionTypes, State, IComment } from './types';
import {
  SET_ARTICLE_ARR,
  REMOVE_ARTICLE,
  CREATE_COMMENT,
  REMOVE_COMMENT,
  EXPAND_COMMENTS,
  SET_COMMENT,
  CREATE_LIKE,
  REMOVE_LIKE,
  CREATE_BOOKMARK,
  REMOVE_BOOKMARK,
} from './actions';

const initialState: State[] = [];

export default (state = initialState, action: ActionTypes): State[] => {
  switch (action.type) {
    case SET_ARTICLE_ARR: {
      return action.payload;
    }
    case REMOVE_ARTICLE: {
      const { payload } = action;
      return state.filter((_, index) => index !== payload);
    }
    case CREATE_COMMENT: {
      const { index, ...comment } = action.payload;
      return fromJS(state)
        .updateIn([index, 'comments'], (comments: IComment[]) => comments.unshift(comment))
        .toJS();
    }
    case REMOVE_COMMENT: {
      const { articleIndex, index } = action.payload;
      return fromJS(state)
        .removeIn([articleIndex, 'comments', index])
        .setIn([articleIndex, 'commentNumber'], state[articleIndex].commentNumber - 1)
        .toJS();
    }
    case EXPAND_COMMENTS: {
      const { index, comments } = action.payload;
      return fromJS(state)
        .updateIn([index, 'comments'], (_comments: IComment[]) => _comments.push(...comments))
        .toJS();
    }
    case SET_COMMENT: {
      const { index, comment } = action.payload;
      return fromJS(state)
        .setIn([index, 'comments', comment.index, 'content'], comment.content)
        .toJS();
    }
    case CREATE_LIKE: {
      const index = action.payload;
      return state.map((value, _index) =>
        _index !== index ? value : { ...value, isLiked: true, likeNumber: value.likeNumber + 1 },
      );
    }
    case REMOVE_LIKE: {
      const index = action.payload;
      return state.map((value, _index) =>
        _index !== index ? value : { ...value, isLiked: false, likeNumber: value.likeNumber - 1 },
      );
    }
    case CREATE_BOOKMARK: {
      const index = action.payload;
      return state.map((value, _index) =>
        _index !== index ? value : { ...value, isBookmarked: true },
      );
    }
    case REMOVE_BOOKMARK: {
      const index = action.payload;
      return state.map((value, _index) =>
        _index !== index ? value : { ...value, isBookmarked: false },
      );
    }
    default:
      return state;
  }
};
