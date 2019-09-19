import axios from 'axios';
import { Create, Remove } from 'types/api/comment';

const commentAxios = axios.create({
  baseURL: '/api/article',
  headers: {
    authorization: `Token ${window.localStorage.getItem('token')}`,
  },
});

export default {
  getAll: ({ articleId }: { articleId: number }) =>
    commentAxios({ url: `/${articleId}/comment`, method: 'GET' }),
  create: ({ articleId, content }: Create) =>
    commentAxios({ url: `/${articleId}/comment`, method: 'POST', data: { content } }),
  remove: ({ articleId, id }: Remove) =>
    commentAxios({ url: `/${articleId}/comment/${id}`, method: 'DELETE' }),
};
