import axios from 'axios';

const likeAxios = axios.create({
  baseURL: '/api/article',
  headers: {
    authorization: `Token ${window.localStorage.getItem('token')}`,
  },
});

export default {
  create: ({ articleId }: { articleId: number }) =>
    likeAxios({ url: `/${articleId}/favorite`, method: 'POST' }),
  remove: ({ articleId }: { articleId: number }) =>
    likeAxios({ url: `/${articleId}/favorite`, method: 'DELETE' }),
};
