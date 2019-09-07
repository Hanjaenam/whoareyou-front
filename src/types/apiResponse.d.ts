interface User {
  id: number;
  email: string;
  name: string;
  valid: boolean;
  introduce: string | null;
  avatar: string | null;
  googleId: string | null;
  naverId: string | null;
  createdAt: string;
  token: string;
}

export interface Message {
  data: {
    message: string;
  };
}
export interface LogInRes {
  data: { user: User; token: string };
}
export interface GetMeRes {
  data: User;
}
export interface PatchAvatarRes {
  data: string;
}
