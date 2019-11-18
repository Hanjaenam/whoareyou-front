export interface OtherUser {
  id: number;
  name: string;
  avatar: string | null;
  introduce: string | null;
  isFollow: null | 1;
}

export interface Follow {
  id: number;
  name: string;
  avatar: string | null;
  introduce: string | null;
  isFollow: null | 1;
}

export interface Search {
  id: number;
  name: string;
  avatar: string | null;
  introduce: string | null;
}
