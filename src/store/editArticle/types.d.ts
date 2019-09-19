import { SET_EDIT_ARTICLE, CLEAN_EDIT_ARTICLE } from './actions';

export interface SetEditArticlePayl {
  id: number;
  content: string;
  photos: { id: number; location: string }[];
}

interface SetEditArticle {
  type: typeof SET_EDIT_ARTICLE;
  payload: SetEditArticlePayl;
}

interface CleanEditArticle {
  type: typeof CLEAN_EDIT_ARTICLE;
}

export type ActionTypes = SetEditArticle | CleanEditArticle;

export interface State {
  id: number;
  content: string;
  photos: [] | { id: number; location: string }[];
}
