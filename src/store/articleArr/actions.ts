import { SetArticleArrPayl, ActionTypes, RemoveArticlePayl } from './types';

export const SET_ARTICLE_ARR = 'articleArr/SET_ARTICLE_ARR';
export const REMOVE_ARTICLE = 'articleArr/REMOVE_ARTICLE';

export const setArticleArr = (payload: SetArticleArrPayl): ActionTypes => ({
  type: SET_ARTICLE_ARR,
  payload,
});
export const removeArticle = (payload: RemoveArticlePayl): ActionTypes => ({
  type: REMOVE_ARTICLE,
  payload,
});
