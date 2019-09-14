import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useApi, useInputWithSet } from 'hooks';
import { userApi } from 'utils/api';
import { setMessage } from 'store/notification/actions';
import { useDispatch } from 'react-redux';
import Button from 'components/Common/Button';
import Input from 'components/Common/Input';

const LabelContainer = styled.div`
  display: flex;
  > input {
    width: ${props => props.theme.width.max.input};
  }
`;

const MessageContainer = styled.div`
  > input {
    width: ${props => props.theme.width.max.input};
  }
`;

const Left = styled.label`
  user-select: none;
  display: block;
  margin-right: 0;
  margin-top: 0;
  margin-bottom: ${props => props.theme.gap.small};
  display: flex;
  justify-content: flex-end;
  flex: 0 0 120px;
  margin-top: ${props => props.theme.gap.tiny};
  margin-right: ${props => props.theme.gap.large};
`;

const Container = styled.div`
  flex: 1;
  display: grid;
  padding: ${props => props.theme.gap.huge} 0;
  grid-gap: ${props => props.theme.gap.medium};
  justify-content: center;
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    ${LabelContainer} {
      display: block;
      > input {
        width: ${props => props.theme.width.min.input};
      }
    }
    ${MessageContainer} {
      > input {
        width: ${props => props.theme.width.min.input};
      }
    }
    ${Left} {
      justify-content: flex-start;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Message = styled.p<{ color: 'info' | 'success' }>`
  font-weight: 600;
  font-size: ${props => props.theme.fontSize.small};
  color: ${props => props.theme.colors[props.color]};
  margin-top: ${props => props.theme.gap.tiny};
`;

export default () => {
  const { setValue: setPrePwd, ...prePassword } = useInputWithSet();
  const { setValue: setNewPwd, ...newPassword } = useInputWithSet();
  const { setValue: setCNewPwd, ...confirmNewPwd } = useInputWithSet();
  const dispatch = useDispatch();
  const { process, loading } = useApi(userApi.changePassword);

  const disabled = () => {
    if (prePassword.value === '' || newPassword.value === '' || confirmNewPwd.value === '')
      return true;
    if (newPassword.value !== confirmNewPwd.value) return true;
    return false;
  };

  /**
   * React는 state가 변경될때마다 항상 리렌더링되며, 리렌더링이 되면 component를 갈아엎고 완전히 새로운 component가 시작되는 것.
   * 만약 useMemo()를 사용하지 않고 함수만 사용하고, return 안에다 함수를 호출하게 된다면, 모든 state가 변경될떄마다 항상 함수가 호출된다.
   *    --> 자원 낭비 ( confirmNewPwd 가 변경되고, 이 값이 newPwd와 다를떄만 사용할 것이기 때문에 )
   * useMemo를 주고 deps로 confirmNewPwd.value를 준다면 confirmNewPwd.value가 변경될때만 함수가 호출되는 것.
   */
  const showMessage = useMemo(() => {
    if (confirmNewPwd.value === '') return;
    if (confirmNewPwd.value !== newPassword.value)
      return <Message color="info">비밀번호가 일치하지 않습니다.</Message>;
    return <Message color="success">비밀번호가 일치합니다.</Message>;
  }, [confirmNewPwd.value]);

  const onClick = () => {
    process({
      prePassword: prePassword.value,
      newPassword: confirmNewPwd.value,
    }).then(() => {
      setPrePwd('');
      setNewPwd('');
      setCNewPwd('');
      dispatch(setMessage({ type: 'success', value: '수정되었습니다.' }));
    });
  };
  return (
    <Container>
      <LabelContainer>
        <Left htmlFor="currnetPassword">현재 비밀번호</Left>
        <Input
          disabled={loading}
          type="password"
          id="currentPassword"
          placeholder="현재 비밀번호"
          {...prePassword}
        />
      </LabelContainer>
      <LabelContainer>
        <Left htmlFor="newPassword">새 비밀번호</Left>
        <Input
          disabled={loading}
          type="password"
          id="newPassword"
          placeholder="새 비밀번호"
          {...newPassword}
        />
      </LabelContainer>
      <LabelContainer>
        <Left htmlFor="confirmNewPassword">새 비밀번호 재입력</Left>
        <MessageContainer>
          <Input
            disabled={loading}
            type="password"
            id="confirmNewPassword"
            placeholder="새 비밀번호 재입력"
            {...confirmNewPwd}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.keyCode === 13 ? onClick() : null
            }
          />
          {showMessage}
        </MessageContainer>
      </LabelContainer>
      <ButtonContainer>
        <Left />
        <Button theme="withBg" disabled={disabled()} loading={loading} onClick={onClick}>
          확인
        </Button>
      </ButtonContainer>
    </Container>
  );
};
