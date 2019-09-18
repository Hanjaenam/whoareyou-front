import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const showKf = keyframes`
0%{
  transform:translateY(-85%);
  opacity:0;
}
100%{
  transform:translateY(-100%);
  opacity:1
}
`;
const showAnim = css`
  animation: ${showKf} 0.25s linear;
`;

const Message = styled.div<{ type: 'danger' | 'success' }>`
  position: absolute;
  width: ${props => props.theme.breakpoints.sm};
  padding: ${props => props.theme.gap.small};
  top: -5%;
  transform: translateY(-100%);
  text-align: center;
  background-color: ${props => props.theme.colors[props.type]};
  border-radius: ${props => props.theme.borderRadius.basic};
  ${showAnim};
  > p {
    color: white;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    border-radius: 0;
  }
`;

const CancelIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  padding: ${props => props.theme.gap.small};
  > svg {
    color: white;
  }
`;

interface IMessage {
  type: 'danger' | 'success';
  value: string;
}

interface IProps {
  message: IMessage;
  setMessage: React.Dispatch<React.SetStateAction<IMessage>>;
}

export default ({ message, setMessage }: IProps) => (
  <Message type={message.type}>
    <p>{message.value}</p>
    <CancelIcon onClick={() => setMessage(s => ({ ...s, value: '' }))}>
      <FontAwesomeIcon icon={faTimes} />
    </CancelIcon>
  </Message>
);
