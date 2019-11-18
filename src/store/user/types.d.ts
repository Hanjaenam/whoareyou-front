import { LOG_IN, PATCH, LOG_OUT, PUSH_FOLLOW, REMOVE_FOLLOW } from './actions';

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

export interface PushFollowPayl {
  id: number;
  name: string;
  avatar: string | null;
}

export interface RemoveFollowPayl {
  id: number;
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

interface PushFollow {
  type: typeof PUSH_FOLLOW;
  payload: PushFollowPayl;
}

interface RemoveFollow {
  type: typeof REMOVE_FOLLOW;
  payload: RemoveFollowPayl;
}

export type ActionTypes = LogIn | Patch | LogOut | PushFollow | RemoveFollow;
// state
export interface State {
  id: number;
  email: string;
  name: string;
  avatar: string | null;
  introduce: string | null;
  createdAt: string;
  follows:
    | {
        id: number;
        name: string;
        avatar: string | null;
      }[]
    | null;
}
