import { Patch, ChangePassword } from 'types/api/user';
import getAxios from 'api';

const userAxios = getAxios({
  baseURL: '/user',
});

export default {
  // headers 를 create에 정의하면 OAuth2 login 이 되지 않는다.
  getMe: () =>
    userAxios({
      url: '/me',
      method: 'GET',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),

  getOne: ({ id }: { id: number }) =>
    userAxios({
      url: `/${id}`,
      method: 'GET',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),

  getArticleOnCreator: ({ id }: { id: number }) =>
    userAxios({
      url: `/${id}/article`,
      method: 'GET',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),

  remove: () =>
    userAxios({
      url: '/',
      method: 'DELETE',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
  patch: ({ name, introduce }: Patch) =>
    userAxios({
      url: '/',
      method: 'PATCH',
      data: { name, introduce },
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
  patchAvatar: ({ formData }: { formData: FormData }) =>
    userAxios({
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
    userAxios({
      url: '/changePassword',
      method: 'PATCH',
      data: { prePassword, newPassword },
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
};
