import React from 'react';
import styled from 'styled-components';
import AuthTemplate from 'components/Templates/Auth';
import Button from 'components/Common/Button';
import Input from 'components/Common/Input';
import VerifyKey from 'components/Auth/VerifyKey';
import { useInput, useApi, useCleanNotification } from 'hooks';
import { Link } from 'react-router-dom';
import { authApi } from 'utils/api';
import { useDispatch } from 'react-redux';
import { setMessage } from 'store/notification/actions';
import { Message } from 'types/apiResponse';

const InputContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.gap.medium};
`;

const Span = styled.span``;

const SLink = styled(Link)`
  text-indent: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.blue};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default () => {
  useCleanNotification();

  const email = useInput();
  const name = useInput();
  const password = useInput();
  const dispatch = useDispatch();
  const { process, loading, success } = useApi(authApi.register);

  const disabled = () =>
    email.value === '' || name.value === '' || password.value === '';

  const onRegister = () => {
    process({
      email: email.value,
      name: name.value,
      password: password.value,
    }).then(({ data }: Message) => {
      dispatch(setMessage({ type: 'success', value: data.message }));
    });
  };

  return (
    <AuthTemplate>
      {!loading && success ? (
        <VerifyKey email={email.value} />
      ) : (
        <InputContainer>
          <Input autoFocus placeholder="이메일" type="email" {...email} />
          <Input placeholder="닉네임" {...name} />
          <Input
            placeholder="비밀번호"
            type="password"
            {...password}
            onKeyUp={e => (e.keyCode === 13 ? onRegister() : null)}
          />
          <Button
            theme="withBg"
            disabled={disabled()}
            onClick={onRegister}
            loading={loading}
          >
            회원가입
          </Button>
          <Span>
            <SLink to="/">뒤로가기</SLink>
          </Span>
        </InputContainer>
      )}
    </AuthTemplate>
  );
};
