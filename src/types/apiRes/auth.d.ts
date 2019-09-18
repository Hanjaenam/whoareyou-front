import { GetMeRes } from './user';

export interface LogInRes extends GetMeRes {
  token: string;
}
