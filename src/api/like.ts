import getAxios from 'api';

const likeAxios = getAxios({
  baseURL: '/article',
});

export default {
  create: ({ articleId }: { articleId: number }) =>
    likeAxios({
      url: `/${articleId}/favorite`,
      method: 'POST',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
  remove: ({ articleId }: { articleId: number }) =>
    likeAxios({
      url: `/${articleId}/favorite`,
      method: 'DELETE',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
};
