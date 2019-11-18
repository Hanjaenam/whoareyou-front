import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from 'store/user/actions';
import { useInput, useApi } from 'hooks';
import authApi from 'api/auth';
import { AxiosError } from 'axios';
import { LogInRes } from 'types/apiRes/auth';
import Button from 'components/Common/Button';
import Input from 'components/Common/Input';
import VerifyKey from 'components/VerifyKey';
import { authContainer } from 'styles/mixins/etc';
import { setMessage } from 'store/notification/actions';

const Container = styled.div`
  ${authContainer}
`;

const InputContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.gap.medium};
`;

const button = css`
  cursor: pointer;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.basic};
  background-color: ${props => props.theme.colors.main};
  padding: ${props => props.theme.gap.medium};
`;

const GoogleButton = styled.button`
  ${button}
  outline:none;
  span {
    font-size: 1rem;
    color: white;
  }
  background-color: #db3236;
  border-color: #eb3c40;
  &:hover {
    background-color: #eb3c40;
  }
  &:active {
    background-color: #db3236;
  }
`;

const NaverButton = styled.button`
  ${button}
  outline:none;
  span {
    font-size: 1rem;
    color: white;
  }
  background-color: #21c800;
  border-color: #13d30f;
  &:hover {
    background-color: #13d30f;
  }
  &:active {
    background-color: #21c800;
  }
`;

const Text = styled.span`
  text-align: center;
  font-size: 0.9rem;
  > span {
    color: ${props => props.theme.colors.secondary};
  }
`;

const SLink = styled(Link)`
  color: ${props => props.theme.colors.blue};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.colors.secondary};
  position: relative;
`;

const Or = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 0 ${props => props.theme.gap.medium};
  color: ${props => props.theme.colors.secondary};
  user-select: none;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-gap: ${props => props.theme.gap.medium};
`;

const isDev = process.env.NODE_ENV === 'development';

export default () => {
  const email = useInput();
  const password = useInput();
  const dispatch = useDispatch();
  const [requireVerify, setRVerify] = useState(false);
  const { process, loading } = useApi(authApi.logIn, 'auth');

  const onLogIn = () =>
    process({ email: email.value, password: password.value })
      .then(({ data }: { data: LogInRes }) => {
        console.log(data);
        dispatch(logIn(data));
        dispatch(setMessage({ type: 'success', value: '환영합니다!' }));
      })
      .catch((err: AxiosError) => err.response && err.response.status === 401 && setRVerify(true));

  return requireVerify ? (
    <VerifyKey type="logIn" email={email.value} />
  ) : (
    <Container>
      <InputContainer>
        <Input autoFocus placeholder="이메일" type="email" {...email} />
        <Input
          placeholder="비밀번호"
          type="password"
          {...password}
          onKeyUp={e => (e.keyCode === 13 ? onLogIn() : null)}
        />
        <Button
          theme="withBg"
          disabled={email.value === '' || password.value === ''}
          onClick={onLogIn}
          loading={loading}
        >
          로그인
        </Button>
        <Text>
          처음이신가요?&nbsp;
          <SLink to="/register">회원가입</SLink>
          <span>&nbsp;or&nbsp;</span>
          <SLink to="/latest">둘러보기</SLink>
        </Text>
        <Text>
          <SLink to="/findPassword">비밀번호를 잊으셨나요?</SLink>
        </Text>
      </InputContainer>
      <Separator>
        <Or>OR</Or>
      </Separator>
      <ButtonContainer>
        <GoogleButton
          onClick={() =>
            window.open(
              isDev ? 'http://localhost:4000/api/auth/google' : '/api/auth/google',
              '_self',
            )
          }
        >
          <span>Google</span>
        </GoogleButton>
        <NaverButton
          onClick={() =>
            window.open(isDev ? 'http://localhost:4000/api/auth/naver' : '/api/auth/naver', '_self')
          }
        >
          <span>Naver</span>
        </NaverButton>
      </ButtonContainer>
    </Container>
  );
};
