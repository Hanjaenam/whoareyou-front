export interface ArticleRes {
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
