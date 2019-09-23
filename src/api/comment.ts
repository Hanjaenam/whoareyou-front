import { Create, Remove, Patch } from 'types/api/comment';
import getAxios from 'api';

const commentAxios = getAxios({
  baseURL: '/article',
  withToken: true,
});

export default {
  getAll: ({ articleId }: { articleId: number }) =>
    commentAxios({ url: `/${articleId}/comment`, method: 'GET' }),
  create: ({ articleId, content }: Create) =>
    commentAxios({ url: `/${articleId}/comment`, method: 'POST', data: { content } }),
  remove: ({ articleId, id }: Remove) =>
    commentAxios({ url: `/${articleId}/comment/${id}`, method: 'DELETE' }),
  patch: ({ articleId, id, content }: Patch) =>
    commentAxios({ url: `/${articleId}/comment/${id}`, method: 'PATCH', data: { content } }),
};
