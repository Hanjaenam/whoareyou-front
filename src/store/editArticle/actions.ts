import { ActionTypes, SetEditArticlePayl } from './types';

export const SET_EDIT_ARTICLE = 'editArticle/SET_EDIT_ARTICLE';
export const CLEAN_EDIT_ARTICLE = 'editArticle/CLEAN_EDIT_ARTICLE';

export const setEditArticle = (payload: SetEditArticlePayl): ActionTypes => ({
  type: SET_EDIT_ARTICLE,
  payload,
});

export const cleanEditArticle = (): ActionTypes => ({
  type: CLEAN_EDIT_ARTICLE,
});
