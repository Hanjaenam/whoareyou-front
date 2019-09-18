export interface LogIn {
  email: string;
  password: string;
}
export interface Register {
  email: string;
  name: string;
  password: string;
}
export interface VerifySecretKey {
  email: string;
  secret: string;
}
export interface SendSecretKey {
  email: string;
  type: 'register' | 'newPassword';
}
export interface ChangePwd {
  email: string;
  password: string;
  secret: string;
}
