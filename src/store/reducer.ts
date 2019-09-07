import { combineReducers } from 'redux';
import header from './header';
import notification from './notification';
import user from './user';
import userEdit from './userEdit';

const rootReducer = combineReducers({
  header,
  notification,
  user,
  userEdit,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
