import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducer';
import { cleanMessage } from 'store/notification/actions';

interface IProps {
  home?: true;
}

interface IMesageContainer {
  type: 'danger' | 'success' | null;
  home: true | undefined;
  showUp: boolean;
}

const MessageContainer = styled.div<IMesageContainer>`
  position: relative;
  margin: 0 auto;
  padding: ${props => props.theme.gap.medium};
  border-radius: ${props => props.theme.borderRadius.basic};
  background-color: ${props =>
    props.type === 'danger' ? props.theme.colors.danger : props.theme.colors.success};
  margin-bottom: ${props => props.theme.gap.medium};
  ${props =>
    props.home &&
    css`
      position: absolute;
      margin-bottom: 0;
      transition: 1s;
      bottom: ${props.theme.gap.small};
      right: ${props.theme.gap.small};
      ${props.showUp
        ? css`
            transform: translateY(0);
          `
        : css`
            transform: ${`translateY(calc(100% + ${props.theme.gap.small}))`};
          `}
    `}
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    margin: ${props => props.theme.gap.small} 0;
  }
`;

const Message = styled.p`
  text-align: center;
  color: white;
  user-select: none;
  margin-right: ${props => props.theme.gap.tiny};
`;

const RemoveMsgButton = styled.button`
  background-color: transparent;
  border: 0;
  outline: 0;
  position: absolute;
  top: 0.25rem;
  right: 0;
  color: white;
  cursor: pointer;
  svg {
    font-size: 1rem;
  }
`;

export default ({ home }: IProps) => {
  const { value, type } = useSelector((state: AppState) => state.notification);
  const [up, setUp] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (value !== null) {
      if (!home) setTimeout(() => dispatch(cleanMessage()), 3000);
      else {
        setTimeout(() => {
          setUp(true);
          setTimeout(() => {
            setUp(false);
            setTimeout(() => {
              dispatch(cleanMessage());
            }, 1000);
          }, 3000);
        }, 100);
      }
    }
  }, [value]);
  return value !== null ? (
    <MessageContainer type={type} home={home} showUp={up}>
      <Message>{value}</Message>
      <RemoveMsgButton onClick={() => dispatch(cleanMessage())}>
        <FontAwesomeIcon icon={faTimes} />
      </RemoveMsgButton>
    </MessageContainer>
  ) : null;
};
