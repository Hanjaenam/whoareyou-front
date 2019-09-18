import React, { useState, useContext } from 'react';
import { useInput, useApi } from 'hooks';
import authApi from 'api/auth';
import { useDispatch } from 'react-redux';
import { logIn } from 'store/user/actions';
import { setMessage } from 'store/notification/actions';
import { LogInRes } from 'types/apiRes/auth';
import { AuthContext } from 'components/Templates/Common/Auth';
import VerifyKey from './Pres';

interface IProps {
  email: string;
  type: 'logIn' | 'register';
}

export default ({ email, type }: IProps) => {
  const secretKey = useInput();
  const dispatch = useDispatch();
  const [isSended, setSend] = useState(type !== 'logIn');
  const { process: processVerify, loading: verifyLoading } = useApi(
    authApi.verifySecretKey,
    'auth',
  );
  const { process: processResend, loading: resendLoading } = useApi(authApi.sendSecretKey, 'auth');
  const authContext = useContext(AuthContext);

  const verifyKey = () =>
    processVerify({ email, secret: secretKey.value })
      .then(({ data }: { data: LogInRes }) => dispatch(logIn(data)))
      .then(() => dispatch(setMessage({ type: 'success', value: '환영합니다!' })));

  const sendSecret = () => {
    if (!window.confirm(`${email} 로 보안코드를 다시 전송하시겠습니까?`)) return;
    processResend({ email, type: 'register' })
      .then(
        () =>
          authContext &&
          authContext.setMessage({
            type: 'success',
            value: `${email}로 보안코드가 전송되었습니다.`,
          }),
      )
      .finally(() => setSend(true));
  };

  return (
    <VerifyKey
      isSended={isSended}
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
