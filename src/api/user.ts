import axios from 'axios';
import { Patch, ChangePassword } from 'types/api/user';

const UserAxios = axios.create({
  baseURL: '/api/user',
});

export default {
  // headers 를 create에 정의하면 OAuth2 login 이 되지 않는다.
  getMe: () =>
    UserAxios({
      url: '/me',
      method: 'GET',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),

  getOne: ({ id }: { id: number }) =>
    UserAxios({
      url: `/${id}`,
      method: 'GET',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),

  getArticleOnCreator: ({ id }: { id: number }) =>
    UserAxios({
      url: `/${id}/article`,
      method: 'GET',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),

  remove: () =>
    UserAxios({
      url: '/',
      method: 'DELETE',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
  patch: ({ name, introduce }: Patch) =>
    UserAxios({
      url: '/',
      method: 'PATCH',
      data: { name, introduce },
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
  patchAvatar: ({ formData }: { formData: FormData }) =>
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
