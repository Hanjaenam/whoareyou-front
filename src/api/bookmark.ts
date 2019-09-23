import getAxios from 'api';

const bookmarkAxios = getAxios({ baseURL: '/article', withToken: true });

export default {
  create: ({ articleId }: { articleId: number }) =>
    bookmarkAxios({ url: `/${articleId}/bookmark`, method: 'POST' }),
  remove: ({ articleId }: { articleId: number }) =>
    bookmarkAxios({ url: `/${articleId}/bookmark`, method: 'DELETE' }),
};
