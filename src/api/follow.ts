import getAxios from 'api';

const followAxios = getAxios({ baseURL: '/follow' });

export default {
  create: ({ whom }: { whom: number }) =>
    followAxios({
      url: '/',
      method: 'POST',
      data: { whom },
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
  remove: ({ whom }: { whom: number }) =>
    followAxios({
      url: '/',
      method: 'DELETE',
      data: { whom },
      headers: {
        authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    }),
};
