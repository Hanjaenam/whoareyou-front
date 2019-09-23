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

export type SetArticleArrPayl = State[];
export type RemoveArticlePayl = number;
export interface CreateCommentPayl {
  index: number;
  id: number;
  content: string;
  creator: string;
  createdAt: string;
}
export interface RemoveCommentPayl {
  articleIndex: number;
  index: number;
}
export type ExpandCommentsPayl = {
  index: number;
  comments: {
    id: number;
    creator: string;
    content: string;
    createdAt: string;
  }[];
};

export interface SetCommentPayl {
  index: number;
  comment: {
    index: number;
    content: string;
  };
}

interface SetArticleArr {
  type: typeof SET_ARTICLE_ARR;
  payload: SetArticleArrPayl;
}

interface RemoveArticle {
  type: typeof REMOVE_ARTICLE;
  payload: RemoveArticlePayl;
}

interface CreateComment {
  type: typeof CREATE_COMMENT;
  payload: CreateCommentPayl;
}

interface RemoveComment {
  type: typeof REMOVE_COMMENT;
  payload: RemoveCommentPayl;
}

interface ExpandComments {
  type: typeof EXPAND_COMMENTS;
  payload: ExpandCommentsPayl;
}

interface SetComment {
  type: typeof SET_COMMENT;
  payload: SetCommentPayl;
}

interface CreateLike {
  type: typeof CREATE_LIKE;
  payload: number;
}

interface RemoveLike {
  type: typeof REMOVE_LIKE;
  payload: number;
}

interface CreateBookmark {
  type: typeof CREATE_BOOKMARK;
  payload: number;
}

interface RemoveBookmark {
  type: typeof REMOVE_BOOKMARK;
  payload: number;
}

export type ActionTypes =
  | SetArticleArr
  | RemoveArticle
  | CreateComment
  | RemoveComment
  | ExpandComments
  | SetComment
  | CreateLike
  | RemoveLike
  | CreateBookmark
  | RemoveBookmark;

export interface ICreator {
  name: string;
  avatar: string;
}

export interface IPhoto {
  id: number;
  location: string;
}

export interface IComment {
  id: number;
  creator: string;
  content: string;
  createdAt: string;
}
export interface State {
  id: number;
  content: string;
  creator: ICreator;
  createdAt: string;
  photos: IPhoto[];
  likeNumber: number;
  commentNumber: number;
  comments: IComment[];
  isLiked: boolean;
  isBookmarked: boolean;
}
