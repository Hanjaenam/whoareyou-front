import { Record } from 'immutable';
import { SET_ARTICLE_ARR, REMOVE_ARTICLE } from './actions';

export type SetArticleArrPayl = State[];
export type RemoveArticlePayl = number;

interface SetArticleArr {
  type: typeof SET_ARTICLE_ARR;
  payload: SetArticleArrPayl;
}

interface RemoveArticle {
  type: typeof REMOVE_ARTICLE;
  payload: RemoveArticlePayl;
}

export type ActionTypes = SetArticleArr | RemoveArticle;

export interface State {
  id: number;
  content: string;
  creator: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  photos: [{ id: number; location: string }];
  likeNumber: number;
  commentNumber: number;
  comments: [{ id: number; creator: string; content: string }];
  isLiked: boolean;
  isBookmarked: boolean;
}
