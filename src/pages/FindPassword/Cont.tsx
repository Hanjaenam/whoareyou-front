import React, { useState } from 'react';
import { useInput, useCleanNotification } from 'hooks';
import { authApi } from 'utils/api';
import { useDispatch } from 'react-redux';
import { setMessage } from 'store/notification/actions';
import { FIND_PASSWORD } from 'constant';
import Presenter from './Pres';

interface IProps {
  history: { replace: (path: string) => void };
}

interface TextByStep {
  step: 1 | 2 | 3;
  text:
    | typeof FIND_PASSWORD.ONE
    | typeof FIND_PASSWORD.TWO
    | typeof FIND_PASSWORD.THREE;
}

export default ({ history: { replace } }: IProps) => {
  const email = useInput();
  const secret = useInput();
  const password = useInput();
  const dispatch = useDispatch();
  const [textByStep, setStep] = useState<TextByStep>({
    step: 1,
    text: FIND_PASSWORD.ONE,
  });
  const [confirmLoading, setCLoading] = useState(false);
  const [sendLoading, setSLoading] = useState(false);

  // component mount되면 cleasn Message
  useCleanNotification();

  const sendSecretKey = (type?: 'resend') => {
    if (type === 'resend') setSLoading(true);
    else setCLoading(true);

    authApi
      .sendSecretKey({ email: email.value, type: 'newPassword' })
      .then(() => {
        dispatch(
          setMessage({
            type: 'success',
            value: `${email.value} 로 보안코드가 전송되었습니다.`,
          }),
        );
        setStep({ step: 2, text: FIND_PASSWORD.TWO });
      })
      .catch(
        err =>
          err.response &&
          dispatch(
            setMessage({ type: 'danger', value: err.response.data.message }),
          ),
      )
      .finally(() =>
        type === 'resend' ? setSLoading(false) : setCLoading(false),
      );
  };

  const resendSecretKey = () => {
    if (!window.confirm(`${email.value} 로 보안코드를 다시 전송하시겠습니까?`))
      return;
    sendSecretKey('resend');
  };

  const verifySecret = () => {
    setCLoading(true);
    authApi
      .verifySecretKey({ email: email.value, secret: secret.value })
      .then(() => {
        dispatch(
          setMessage({
            type: 'success',
            value: `보안코드 ${secret.value}, 확인되었습니다.`,
          }),
        );
        setStep({ step: 3, text: FIND_PASSWORD.THREE });
      })
      .catch(
        err =>
          err.response &&
          dispatch(
            setMessage({ type: 'danger', value: err.response.data.message }),
          ),
      )
      .finally(() => setCLoading(false));
  };
  const changePassword = () => {
    setCLoading(true);
    authApi
      .changePassword({
        email: email.value,
        password: password.value,
        secret: secret.value,
      })
      .then(() => {
        dispatch(
          setMessage({ type: 'success', value: '비밀번호가 변경되었습니다.' }),
        );
        setTimeout(() => replace('/'), 500);
      })
      .finally(() => setCLoading(false));
  };

  const onClick = () => {
    switch (textByStep.step) {
      case 1:
        sendSecretKey();
        break;
      case 2:
        verifySecret();
        break;
      case 3:
        changePassword();
        break;
      default:
        break;
    }
  };

  const getInput = (): {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  } => {
    switch (textByStep.step) {
      case 1:
        return email;
      case 2:
        return secret;
      case 3:
        return password;
      default:
        return email;
    }
  };

  const disabled = (): boolean => {
    switch (textByStep.step) {
      case 1:
        return email.value === '';
      case 2:
        return secret.value === '';
      case 3:
        return password.value === '';
      default:
        return false;
    }
  };

  const inputType = (): string => {
    switch (textByStep.step) {
      case 1:
        return 'email';
      case 2:
        return 'text';
      case 3:
        return 'password';
      default:
        return 'text';
    }
  };

  return (
    <Presenter
      confirmLoading={confirmLoading}
      disabled={disabled}
      getInput={getInput}
      inputType={inputType}
      onClick={onClick}
      resendSecretKey={resendSecretKey}
      step={textByStep.step}
      sendLoading={sendLoading}
      text={textByStep.text}
      email={email.value}
    />
  );
};
