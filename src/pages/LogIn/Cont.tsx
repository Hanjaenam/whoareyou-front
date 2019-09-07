import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from 'store/user/actions';
import { useInput, useApi, useCleanNotification } from 'hooks';
import { authApi, userApi } from 'utils/api';
import { AxiosError } from 'axios';
import { LogInRes, GetMeRes } from 'types/apiResponse';
import Presnter from './Pres';

interface IProps {
  history: { push: (path: string) => void };
  logIn: typeof logIn;
  location: { search: string };
}

export default ({ history: { push }, location: { search } }: IProps) => {
  useCleanNotification();

  const email = useInput();
  const password = useInput();
  const dispatch = useDispatch();
  const [requireVerify, setRVerify] = useState(false);
  const { process, loading } = useApi(authApi.logIn);

  useEffect(() => {
    // OAuth 로그인 전용
    if (search.includes('token')) {
      const token = search.split('=')[1];

      userApi.getMe().then(({ data }: GetMeRes) => {
        dispatch(logIn({ user: data, token }));
      });
    }
  }, [search]);

  const disabled = () => email.value === '' || password.value === '';

  const onLogIn = () =>
    process({ email: email.value, password: password.value })
      .then(({ data }: LogInRes) => {
        dispatch(logIn(data));
        push('/article');
      })
      .catch(
        (err: AxiosError) =>
          err.response && err.response.status === 403 && setRVerify(true),
      );

  return (
    <Presnter
      disabled={disabled}
      email={email}
      loading={loading}
      onLogIn={onLogIn}
      password={password}
      requireVerify={requireVerify}
    />
  );
};
