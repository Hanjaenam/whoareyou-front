import getAxios from 'api';

const articleAxios = getAxios({
  baseURL: '/article',
});

export default {
  getAll: ({ category }: { category: 'latest' | 'favorite' | 'bookmark' }) =>
    articleAxios({
      url: `/${category}`,
      method: 'GET',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),

  getCreator: ({ id }: { id: number }) =>
    articleAxios({
      url: `${id}/creator`,
      method: 'GET',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),

  create: ({ formData }: { formData: FormData }) =>
    articleAxios({
      url: '/',
      method: 'POST',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
        'content-type': 'multipart/form-data',
      },
      data: formData,
    }),

  remove: ({ id }: { id: number }) =>
    articleAxios({
      url: `/${id}`,
      method: 'DELETE',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
};
