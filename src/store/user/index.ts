import { ActionTypes, State } from './types';
import { LOG_IN, PATCH, LOG_OUT } from './actions';

const initialState: State = {
  id: -1,
  email: '',
  name: '',
  avatar: null,
  introduce: null,
  createdAt: '',
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
    default:
      return state;
  }
};
