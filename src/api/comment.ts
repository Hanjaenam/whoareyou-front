import { Create, Remove, Patch } from 'types/api/comment';
import getAxios from 'api';

const commentAxios = getAxios({
  baseURL: '/article',
});

export default {
  getAll: ({ page, articleId }: { page: number; articleId: number }) =>
    commentAxios({
      url: `/${articleId}/comment?page=${page}`,
      method: 'GET',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
  create: ({ articleId, content }: Create) =>
    commentAxios({
      url: `/${articleId}/comment`,
      method: 'POST',
      data: { content },
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
  remove: ({ articleId, id }: Remove) =>
    commentAxios({
      url: `/${articleId}/comment/${id}`,
      method: 'DELETE',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
  patch: ({ articleId, id, content }: Patch) =>
    commentAxios({
      url: `/${articleId}/comment/${id}`,
      method: 'PATCH',
      data: { content },
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
};
