import React, { useContext } from 'react';
import styled from 'styled-components';
import Input from 'components/Common/Input';
import Button from 'components/Common/Button';
import VerifyKey from 'components/VerifyKey';
import { Link } from 'react-router-dom';
import { useInput, useApi } from 'hooks';
import authApi from 'api/auth';
import { authContainer } from 'styles/mixins/etc';
import { AuthContext } from './Common/Auth';

const InputContainer = styled.div`
  ${authContainer};
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
  const email = useInput();
  const name = useInput();
  const password = useInput();
  const { process, loading, success } = useApi(authApi.register, 'auth');
  const authContext = useContext(AuthContext);

  const onRegister = () =>
    process({
      email: email.value,
      name: name.value,
      password: password.value,
    }).then(
      () =>
        authContext &&
        authContext.setMessage({
          type: 'success',
          value: `${email.value}로 보안코드가 전송되었습니다.`,
        }),
    );

  return !loading && success ? (
    <VerifyKey email={email.value} type="register" />
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
        disabled={email.value === '' || name.value === '' || password.value === ''}
        onClick={onRegister}
        loading={loading}
      >
        회원가입
      </Button>
      <Span>
        <SLink to="/">뒤로가기</SLink>
      </Span>
    </InputContainer>
  );
};
