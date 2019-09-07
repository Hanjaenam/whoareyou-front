import axios from 'axios';
import {
  AuthLogIn,
  AuthRegister,
  AuthVerifySecretKey,
  AuthSendSecretKey,
  AuthChangePwd,
  UserPatch,
  PatchAvatar,
  ChangePassword,
} from 'types/api';

const AuthAxios = axios.create({ baseURL: '/api/auth' });

export const authApi = {
  logIn: ({ email, password }: AuthLogIn) =>
    AuthAxios({ url: '/logIn', method: 'POST', data: { email, password } }),

  register: ({ email, name, password }: AuthRegister) =>
    AuthAxios({
      url: '/register',
      method: 'POST',
      data: { email, name, password },
    }),

  verifySecretKey: ({ email, secret }: AuthVerifySecretKey) =>
    AuthAxios({
      url: '/verifySecretKey',
      method: 'POST',
      data: { email, secret },
    }),

  sendSecretKey: ({ email, type }: AuthSendSecretKey) =>
    AuthAxios({ url: '/sendSecretKey', method: 'POST', data: { email, type } }),

  changePassword: ({ email, password, secret }: AuthChangePwd) =>
    AuthAxios({
      url: '/changePassword',
      method: 'PATCH',
      data: { email, password, secret },
    }),
};

const UserAxios = axios.create({
  baseURL: '/api/user',
  headers: {
    authorization: `Bearer ${window.localStorage.getItem('token')}`,
  },
});

export const userApi = {
  getMe: () =>
    UserAxios({
      url: '/me',
      method: 'GET',
    }),
  delete: () => UserAxios({ url: '/', method: 'DELETE' }),
  patch: ({ name, introduce }: UserPatch) =>
    UserAxios({
      url: '/',
      method: 'PATCH',
      data: { name, introduce },
    }),
  patchAvatar: ({ formData }: PatchAvatar) =>
    UserAxios({
      url: '/avatar',
      method: 'PATCH',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: formData,
    }),
  changePassword: ({ prePassword, newPassword }: ChangePassword) =>
    // data:'123' -> server: req.body = '123
    UserAxios({
      url: '/changePassword',
      method: 'PATCH',
      data: { prePassword, newPassword },
    }),
};
