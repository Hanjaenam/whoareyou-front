export interface GetMeRes {
  id: number;
  email: string;
  name: string;
  avatar: string | null;
  introduce: string | null;
  createdAt: string;
}

export interface GetOne {
  id: number;
  name: string;
  avatar: string | null;
  introduce: string | null;
}
