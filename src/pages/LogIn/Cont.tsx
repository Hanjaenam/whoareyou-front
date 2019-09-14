import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from 'store/user/actions';
import { useInput, useApi, useCleanNotification } from 'hooks';
import { authApi } from 'utils/api';
import { AxiosError } from 'axios';
import { LogInRes } from 'types/apiResponse';
import Presnter from './Pres';

// interface IProps {
//   history: { push: (path: string) => void };
//   logIn: typeof logIn;
//   location: { search: string };
// }

export default () => {
  useCleanNotification();
  const email = useInput();
  const password = useInput();
  const dispatch = useDispatch();
  const [requireVerify, setRVerify] = useState(false);
  const { process, loading } = useApi(authApi.logIn);
  const disabled = () => email.value === '' || password.value === '';

  const onLogIn = () =>
    process({ email: email.value, password: password.value })
      .then(({ data }: { data: LogInRes }) => dispatch(logIn(data)))
      .catch((err: AxiosError) => err.response && err.response.status === 401 && setRVerify(true));

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
