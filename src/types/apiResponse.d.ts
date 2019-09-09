export interface GetMeRes {
  id: string;
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
