import React, { useState } from 'react';
import { useInput, useApi } from 'hooks';
import { authApi } from 'utils/api';
import { useDispatch } from 'react-redux';
import { logIn } from 'store/user/actions';
import { setMessage } from 'store/notification/actions';
import { LogInRes } from 'types/apiResponse';
import VerifyKey from './Pres';

interface IProps {
  email: string;
  type?: 'logIn';
}

export default ({ email, type }: IProps) => {
  const secretKey = useInput();
  const dispatch = useDispatch();
  const [send, setSend] = useState(type !== 'logIn');
  const { process: processVerify, loading: verifyLoading } = useApi(
    authApi.verifySecretKey,
  );
  const { process: processResend, loading: resendLoading } = useApi(
    authApi.sendSecretKey,
  );

  const disabled = () => secretKey.value === '' || resendLoading;

  const verifyKey = () =>
    processVerify({ email, secret: secretKey.value }).then(
      ({ data }: LogInRes) => {
        dispatch(logIn(data));
      },
    );

  const sendSecret = () => {
    if (!window.confirm(`${email} 로 보안코드를 다시 전송하시겠습니까?`))
      return;
    processResend({ email, type: 'register' })
      .then(() => {
        dispatch(
          setMessage({
            type: 'success',
            value: `${email} 로 보안코드가 전송되었습니다.`,
          }),
        );
      })
      .finally(() => setSend(true));
  };

  return (
    <VerifyKey
      disabled={disabled}
      send={send}
      email={email}
      verifyKey={verifyKey}
      resendLoading={resendLoading}
      sendSecret={sendSecret}
      secretKey={secretKey}
      type={type}
      verifyLoading={verifyLoading}
    />
  );
};
