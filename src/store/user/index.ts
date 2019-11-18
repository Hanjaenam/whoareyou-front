import { ActionTypes, State } from './types';
import { LOG_IN, PATCH, LOG_OUT, PUSH_FOLLOW, REMOVE_FOLLOW } from './actions';

const initialState: State = {
  id: -1,
  email: '',
  name: '',
  avatar: null,
  introduce: null,
  createdAt: '',
  follows: null,
};

export default (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case LOG_IN: {
      const { token, ...user } = action.payload;
      if (token) window.localStorage.setItem('token', token);
      return user;
    }
    case PATCH: {
      const {
        payload: { name, avatar, introduce },
      } = action;
      return {
        ...state,
        name: name === undefined || name === state.name ? state.name : name,
        introduce:
          introduce === undefined || introduce === state.introduce ? state.introduce : introduce,
        avatar: avatar === undefined ? state.avatar : avatar,
      };
    }
    case LOG_OUT: {
      window.localStorage.removeItem('token');
      return initialState;
    }
    case PUSH_FOLLOW: {
      const { payload } = action;
      return {
        ...state,
        follows: state.follows && [...state.follows, payload],
      };
    }
    case REMOVE_FOLLOW: {
      return {
        ...state,
        follows: state.follows && state.follows.filter(follow => follow.id !== action.payload.id),
      };
    }
    default:
      return state;
  }
};
