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
  PostArticle,
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
});

export const userApi = {
  // headers 를 create에 정의하면 OAuth2 login 이 되지 않는다.
  getMe: () =>
    UserAxios({
      url: '/me',
      method: 'GET',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
  delete: () =>
    UserAxios({
      url: '/',
      method: 'DELETE',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
  patch: ({ name, introduce }: UserPatch) =>
    UserAxios({
      url: '/',
      method: 'PATCH',
      data: { name, introduce },
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
  patchAvatar: ({ formData }: PatchAvatar) =>
    UserAxios({
      url: '/avatar',
      method: 'PATCH',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
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
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
};

const ArticleAxios = axios.create({
  baseURL: '/api/article',
  headers: {
    authorization: `Token ${window.localStorage.getItem('token')}`,
  },
});

export const articleApi = {
  getAll: () => ArticleAxios({ url: '/', method: 'GET' }),
  create: ({ formData }: PostArticle) =>
    ArticleAxios({
      url: '/',
      method: 'POST',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
        'content-type': 'multipart/form-data',
      },
      data: formData,
    }),
};
