export interface AuthLogIn {
  email: string;
  password: string;
}
export interface AuthRegister {
  email: string;
  name: string;
  password: string;
}
export interface AuthVerifySecretKey {
  email: string;
  secret: string;
}
export interface AuthSendSecretKey {
  email: string;
  type: 'register' | 'newPassword';
}
export interface AuthChangePwd {
  email: string;
  password: string;
  secret: string;
}

export interface UserPatch {
  name: string;
  introduce: string;
}

export interface PatchAvatar {
  formData: FormData;
}

export interface ChangePassword {
  prePassword: string;
  newPassword: string;
}
