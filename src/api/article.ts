import axios from 'axios';

const ArticleAxios = axios.create({
  baseURL: '/api/article',
  headers: {
    authorization: `Token ${window.localStorage.getItem('token')}`,
  },
});

export default {
  getAll: () => ArticleAxios({ url: '/', method: 'GET' }),

  getCreator: ({ id }: { id: number }) => ArticleAxios({ url: `${id}/creator`, method: 'GET' }),

  create: ({ formData }: { formData: FormData }) =>
    ArticleAxios({
      url: '/',
      method: 'POST',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
        'content-type': 'multipart/form-data',
      },
      data: formData,
    }),

  remove: ({ id }: { id: number }) => ArticleAxios({ url: `/${id}`, method: 'DELETE' }),
};
