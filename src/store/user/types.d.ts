import { LOG_IN, PATCH, LOG_OUT } from './actions';

// payload
export interface LogInPayl {
  user: {
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
  };
  token?: string;
}
export interface PatchPayl {
  name?: string;
  introduce?: string;
  avatar?: string;
  valid?: boolean;
  googleId?: string;
  naverId?: string;
}
// action
interface LogIn {
  type: typeof LOG_IN;
  payload: LogInPayl;
}
interface Patch {
  type: typeof PATCH;
  payload: PatchPayl;
}
interface LogOut {
  type: typeof LOG_OUT;
}
export type ActionTypes = LogIn | Patch | LogOut;
// state
export interface State {
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
