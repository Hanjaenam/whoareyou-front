import {
  SetArticleArrPayl,
  ActionTypes,
  RemoveArticlePayl,
  CreateCommentPayl,
  RemoveCommentPayl,
  SetCommentPayl,
} from './types';

export const SET_ARTICLE_ARR = 'articleArr/SET_ARTICLE_ARR';
export const REMOVE_ARTICLE = 'articleArr/REMOVE_ARTICLE';
export const CREATE_COMMENT = 'articleArr/CREATE_COMMENT';
export const REMOVE_COMMENT = 'articleArr/REMOVE_COMMENT';
export const SET_COMMENT = 'articleArr/SET_COMMENT';

export const setArticleArr = (payload: SetArticleArrPayl): ActionTypes => ({
  type: SET_ARTICLE_ARR,
  payload,
});
export const removeArticle = (payload: RemoveArticlePayl): ActionTypes => ({
  type: REMOVE_ARTICLE,
  payload,
});
export const createComment = (payload: CreateCommentPayl): ActionTypes => ({
  type: CREATE_COMMENT,
  payload,
});
export const removeComment = (payload: RemoveCommentPayl): ActionTypes => ({
  type: REMOVE_COMMENT,
  payload,
});
export const setComment = (payload: SetCommentPayl): ActionTypes => ({
  type: SET_COMMENT,
  payload,
});
