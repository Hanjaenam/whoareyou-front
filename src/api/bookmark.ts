import getAxios from 'api';

const bookmarkAxios = getAxios({
  baseURL: '/article',
});

export default {
  create: ({ articleId }: { articleId: number }) =>
    bookmarkAxios({
      url: `/${articleId}/bookmark`,
      method: 'POST',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
  remove: ({ articleId }: { articleId: number }) =>
    bookmarkAxios({
      url: `/${articleId}/bookmark`,
      method: 'DELETE',
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
};
