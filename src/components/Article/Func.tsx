import React from 'react';
import styled, { css } from 'styled-components';
import {
  faBookmark as solBookmark,
  faThumbsUp as solThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import {
  faBookmark as reBookMark,
  faThumbsUp as reThumbsUp,
  faCommentDots,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { basic } from 'styles/mixins/button';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';

interface IProps {
  isLiked: boolean;
  isBookmarked: boolean;
  toggleWriteComnt: () => void;
  likeNumber: number;
}

const LikeContainer = styled.div`
  display: flex;
  border-top: 1px solid ${props => props.theme.colors.secondary};
  padding: ${props => props.theme.gap.tiny};
  > div + div {
    margin-left: ${props => props.theme.gap.tiny};
  }
  > div {
    flex: 1;
    > svg {
      font-size: ${props => props.theme.fontSize.large};
    }
  }
`;

const LikeNumber = styled.span`
  margin-left: ${props => props.theme.gap.tiny};
`;

const Button = styled.div<{ disabled?: boolean; active?: boolean }>`
  ${basic({ padding: 'small' })}
  ${props =>
    props.disabled
      ? css`
          cursor: not-allowed;
          background-color: ${props.theme.colors.secondary};
          opacity: 0.5;
        `
      : css`
          &:hover {
            background-color: ${props.theme.colors.aside()};
          }
          &:active {
            transform: scale(0.98);
          }
        `}
    
  ${props =>
    props.active &&
    css`
      background-color: ${props.theme.colors.blue};
      > svg,
      > span {
        color: white;
      }
    `}
`;

export default ({ isLiked, isBookmarked, toggleWriteComnt, likeNumber }: IProps) => {
  const isLogged = useSelector((state: AppState) => state.user.id !== -1);
  return (
    <LikeContainer>
      <Button disabled={!isLogged} active={isLiked}>
        <FontAwesomeIcon icon={isLiked ? solThumbsUp : reThumbsUp} />
        <LikeNumber>{likeNumber}</LikeNumber>
      </Button>
      <Button onClick={toggleWriteComnt}>
        <FontAwesomeIcon icon={faCommentDots} />
      </Button>
      <Button disabled={!isLogged} active={isBookmarked}>
        <FontAwesomeIcon icon={isBookmarked ? solBookmark : reBookMark} />
      </Button>
    </LikeContainer>
  );
};
