import React from 'react';
import styled, { css } from 'styled-components';
import Button from 'components/Common/Button';
import Input from 'components/Common/Input';
import Loader from 'components/Common/Loader';
import { myTheme } from 'styles/theme';
import { authContainer } from 'styles/mixins/etc';

const Container = styled.div`
  ${authContainer};
`;

const Title = styled.p`
  text-indent: 1rem;
  font-size: 1.2rem;
  padding-bottom: ${props => props.theme.gap.medium};
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
`;

const Explain = styled.p`
  font-size: 0.9rem;
`;

const Bottom = styled.div<{ step: number }>`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.step === 2 ? 'space-between' : 'flex-end')};
`;

const ButtonContainer = styled.div`
  display: flex;
  > div:last-child {
    margin-left: ${props => props.theme.gap.tiny};
  }
`;

const ReceivedEmailContainer = styled.div`
  display: flex;
  align-content: center;
`;

const NotReceivedEmail = styled.p<{ loading: string }>`
  position: relative;
  font-size: 0.9rem;
  bottom: -0.1rem;
  ${props =>
    props.loading === 'true'
      ? css`
          color: ${props.theme.colors.secondary};
          cursor: not-allowed;
        `
      : css`
          color: ${props.theme.colors.blue};
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        `}
`;

const InputContainer = styled.div`
  > input {
    width: 100%;
  }
`;
const P = styled.p`
  font-size: 0.8rem;
  margin-top: ${props => props.theme.gap.tiny};
  text-align: right;
`;

const Span = styled.span`
  font-weight: bold;
`;

interface IProps {
  confirmLoading: boolean;
  disabled: () => boolean;
  getInput: () => {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  inputType: () => string;
  onClick: () => void;
  resendSecretKey: () => void;
  step: 1 | 2 | 3;
  sendLoading: boolean;
  text: {
    TITLE: string;
    EXPLAIN: string;
    PLACEHOLDER: string;
  };
  email: string;
  onCancel: () => void;
}

export default ({
  confirmLoading,
  disabled,
  getInput,
  inputType,
  onClick,
  resendSecretKey,
  step,
  sendLoading,
  text,
  email,
  onCancel,
}: IProps) => (
  <Container>
    <Title>{text.TITLE}</Title>
    <Explain>{text.EXPLAIN}</Explain>
    <InputContainer>
      <Input
        autoFocus
        type={inputType()}
        placeholder={text.PLACEHOLDER}
        {...getInput()}
        onKeyUp={e => (e.keyCode === 13 ? onClick() : null)}
      />
      {step === 2 && (
        <P>
          다음 이메일로 전송됨 : <Span>{email}</Span>
        </P>
      )}
    </InputContainer>
    <Bottom step={step}>
      {step === 2 && (
        <ReceivedEmailContainer>
          <NotReceivedEmail loading={sendLoading.toString()} onClick={resendSecretKey}>
            보안코드를 받지 못했나요?
          </NotReceivedEmail>
          &nbsp;
          {sendLoading && <Loader color={myTheme.colors.secondary} position="relative" />}
        </ReceivedEmailContainer>
      )}
      <ButtonContainer>
        <Button
          theme="withBg"
          disabled={disabled() || (step === 2 && sendLoading)}
          loading={confirmLoading}
          onClick={onClick}
        >
          확인
        </Button>
        <Button theme="border" color="danger" onClick={onCancel}>
          {step === 1 ? '뒤로' : '취소'}
        </Button>
      </ButtonContainer>
    </Bottom>
  </Container>
);
