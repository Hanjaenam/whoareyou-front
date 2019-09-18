import { SetArticleArrPayl, ActionTypes } from './types';

export const SET_ARTICLE_ARR = 'article/SET_ARTICLE_ARR';
export const setArticleArr = (payload: SetArticleArrPayl): ActionTypes => ({
  type: SET_ARTICLE_ARR,
  payload,
});
