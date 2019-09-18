import { Basic } from './user';

export interface LogInRes extends Basic {
  token: string;
}
