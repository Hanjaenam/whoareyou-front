export interface GetMeRes {
  id: number;
  email: string;
  name: string;
  valid: boolean;
  introduce: string | null;
  avatar: string | null;
  googleId: string | null;
  naverId: string | null;
  createdAt: string;
}
export interface Message {
  message: string;
}
export interface LogInRes extends GetMeRes {
  token: string;
}
export interface ArticleRes {
  id: number;
  content: string;
  createdAt: string;
  creator: {
    name: string;
    avatar: string;
  };
  photos: [{ id: number; location: string }];
  likeNumber: number;
  commentNumber: number;
  comments: [{ id: number; creator: string; content: string }];
  isLiked: boolean;
  isBookmarked: boolean;
}
