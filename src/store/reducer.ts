import { combineReducers } from 'redux';
import header from './header';
import notification from './notification';
import user from './user';
import userEdit from './userEdit';
import articleArr from './articleArr';
import editArticle from './editArticle';

const rootReducer = combineReducers({
  header,
  notification,
  user,
  userEdit,
  articleArr,
  editArticle,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
