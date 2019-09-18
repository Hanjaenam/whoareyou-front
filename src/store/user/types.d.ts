import { LOG_IN, PATCH, LOG_OUT } from './actions';

// payload
export interface LogInPayl extends State {
  token?: string;
}
export interface PatchPayl {
  name?: string;
  introduce?: string;
  avatar?: string;
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
  avatar: string | null;
  introduce: string | null;
  createdAt: string;
}
