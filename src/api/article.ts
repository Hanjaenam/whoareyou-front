import axios from 'axios';

const articleAxios = axios.create({
  baseURL: '/api/article',
  headers: {
    authorization: `Token ${window.localStorage.getItem('token')}`,
  },
});

export default {
  getAll: () => articleAxios({ url: '/', method: 'GET' }),

  getCreator: ({ id }: { id: number }) => articleAxios({ url: `${id}/creator`, method: 'GET' }),

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

  remove: ({ id }: { id: number }) => articleAxios({ url: `/${id}`, method: 'DELETE' }),
};
