import { SET_ARTICLES } from './actions';

export type SetArticleArrPayl = State[];

interface SetArticleArr {
  type: typeof SET_ARTICLES;
  payload: SetArticleArrPayl;
}

export type ActionTypes = SetArticleArr;

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
