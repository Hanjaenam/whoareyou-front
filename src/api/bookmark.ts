import axios from 'axios';

const bookmarkAxios = axios.create({
  baseURL: '/api/article',
  headers: {
    authorization: `Token ${window.localStorage.getItem('token')}`,
  },
});

export default {
  create: ({ articleId }: { articleId: number }) =>
    bookmarkAxios({ url: `/${articleId}/bookmark`, method: 'POST' }),
  remove: ({ articleId }: { articleId: number }) =>
    bookmarkAxios({ url: `/${articleId}/bookmark`, method: 'DELETE' }),
};
