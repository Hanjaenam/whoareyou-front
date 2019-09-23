import getAxios from 'api';

const likeAxios = getAxios({
  baseURL: '/article',
  withToken: true,
});

export default {
  create: ({ articleId }: { articleId: number }) =>
    likeAxios({ url: `/${articleId}/favorite`, method: 'POST' }),
  remove: ({ articleId }: { articleId: number }) =>
    likeAxios({ url: `/${articleId}/favorite`, method: 'DELETE' }),
};
