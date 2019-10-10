import {
  PushArticlePayl,
  ActionTypes,
  RemoveArticlePayl,
  CreateCommentPayl,
  RemoveCommentPayl,
  ExpandCommentsPayl,
  SetCommentPayl,
  SetArticlePayl,
} from './types';

export const SET_ARTICLE = 'articleArr/SET_ARTICLE';
export const PUSH_ARTICLE = 'articleArr/PUSH_ARTICLE';
export const REMOVE_ARTICLE = 'articleArr/REMOVE_ARTICLE';
export const CREATE_COMMENT = 'articleArr/CREATE_COMMENT';
export const REMOVE_COMMENT = 'articleArr/REMOVE_COMMENT';
export const EXPAND_COMMENTS = 'articleArr/EXPAND_COMMENTS';
export const SET_COMMENT = 'articleArr/SET_COMMENT';
export const CREATE_LIKE = 'articleArr/CREATE_LIKE';
export const REMOVE_LIKE = 'articleArr/REMOVE_LIKE';
export const CREATE_BOOKMARK = 'articleArr/CREATE_BOOKMARK';
export const REMOVE_BOOKMARK = 'articleArr/REMOVE_BOOKMARK';

export const setArticle = (payload: SetArticlePayl): ActionTypes => ({
  type: SET_ARTICLE,
  payload,
});
export const pushArticle = (payload: PushArticlePayl): ActionTypes => ({
  type: PUSH_ARTICLE,
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
export const expandComments = (payload: ExpandCommentsPayl): ActionTypes => ({
  type: EXPAND_COMMENTS,
  payload,
});
export const setComment = (payload: SetCommentPayl): ActionTypes => ({
  type: SET_COMMENT,
  payload,
});
export const createLike = (payload: number): ActionTypes => ({
  type: CREATE_LIKE,
  payload,
});

export const removeLike = (payload: number): ActionTypes => ({
  type: REMOVE_LIKE,
  payload,
});

export const createBookmark = (payload: number): ActionTypes => ({
  type: CREATE_BOOKMARK,
  payload,
});

export const removeBookmark = (payload: number): ActionTypes => ({
  type: REMOVE_BOOKMARK,
  payload,
});
