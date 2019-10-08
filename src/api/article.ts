import getAxios from 'api';

const articleAxios = getAxios({
  baseURL: '/article',
});

export default {
  getAll: ({
    page,
    isLogged,
    category,
  }: {
    page: number;
    isLogged: boolean;
    category: 'latest' | 'favorite' | 'bookmark';
  }) => {
    const headers = isLogged
      ? { authorization: `Token ${window.localStorage.getItem('token')}` }
      : undefined;
    return articleAxios({
      url: `/${category}?page=${page}`,
      method: 'GET',
      headers,
    });
  },

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
