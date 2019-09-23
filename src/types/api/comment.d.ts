export interface Create {
  articleId: number;
  content: string;
}

export interface Remove {
  articleId: number;
  id: number;
}

export interface Patch {
  articleId: number;
  id: number;
  content: string;
}
