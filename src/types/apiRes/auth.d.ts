import { State } from 'store/user/types';

export interface LogInRes extends State {
  token: string;
}
