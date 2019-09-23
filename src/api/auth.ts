import { LogIn, Register, VerifySecretKey, SendSecretKey, ChangePwd } from 'types/api/auth';
import getAxios from 'api';

const AuthAxios = getAxios({ baseURL: '/auth', withToken: false });

export default {
  logIn: ({ email, password }: LogIn) =>
    AuthAxios({ url: '/logIn', method: 'POST', data: { email, password } }),

  register: ({ email, name, password }: Register) =>
    AuthAxios({
      url: '/register',
      method: 'POST',
      data: { email, name, password },
    }),

  verifySecretKey: ({ email, secret }: VerifySecretKey) =>
    AuthAxios({
      url: '/verifySecretKey',
      method: 'POST',
      data: { email, secret },
    }),

  sendSecretKey: ({ email, type }: SendSecretKey) =>
    AuthAxios({ url: '/sendSecretKey', method: 'POST', data: { email, type } }),

  changePassword: ({ email, password, secret }: ChangePwd) =>
    AuthAxios({
      url: '/changePassword',
      method: 'PATCH',
      data: { email, password, secret },
    }),
};
