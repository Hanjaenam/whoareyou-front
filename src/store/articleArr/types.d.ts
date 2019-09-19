import {
  SET_ARTICLE_ARR,
  REMOVE_ARTICLE,
  CREATE_COMMENT,
  REMOVE_COMMENT,
  SET_COMMENT,
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
  index: number;
  id: number;
}
export type SetCommentPayl = {
  index: number;
  comments: {
    id: number;
    creator: string;
    content: string;
    createdAt: string;
  }[];
};

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

interface SetComment {
  type: typeof SET_COMMENT;
  payload: SetCommentPayl;
}

export type ActionTypes =
  | SetArticleArr
  | RemoveArticle
  | CreateComment
  | RemoveComment
  | SetComment;

export interface State {
  id: number;
  content: string;
  creator: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  photos: { id: number; location: string }[];
  likeNumber: number;
  commentNumber: number;
  comments: { id: number; creator: string; content: string; createdAt: string }[];
  isLiked: boolean;
  isBookmarked: boolean;
}
