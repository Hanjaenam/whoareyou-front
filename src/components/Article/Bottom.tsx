import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import {
  faBookmark as solBookmark,
  faThumbsUp as solThumbsUp,
  faPlus,
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
import { useInputWithSet } from 'hooks';
import TextArea from 'react-autosize-textarea';
import Button from 'components/Common/Button';
import { ArticleContext } from 'context/article';

const Container = styled.div`
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

const Function = styled.div<{ disabled?: boolean; active?: boolean }>`
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

const TextAreaContainer = styled.div`
  display: flex;
  border-top: 1px solid ${props => props.theme.colors.secondary};
  > div {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const CustomTextArea = styled(TextArea)`
  all: unset;
  width: 100%;
  border: 0;
  font-size: ${props => props.theme.fontSize.medium};
  padding: ${props => props.theme.gap.medium};
  padding-right: 0;
  outline: none;
`;

export default () => {
  const data = useContext(ArticleContext);
  if (data === null) return null;

  const isLogged = useSelector((state: AppState) => state.user.id !== -1);
  const { value: myComment, setValue: setMyComment } = useInputWithSet();
  const [wrtieComnt, setWriteComnt] = useState(false);
  const { isLiked, likeNumber, isBookmarked } = useSelector(
    (state: AppState) => state.articleArr[data.index],
  );
  return (
    <>
      <Container>
        <Function disabled={!isLogged} active={isLiked}>
          <FontAwesomeIcon icon={isLiked ? solThumbsUp : reThumbsUp} />
          <LikeNumber>{likeNumber}</LikeNumber>
        </Function>
        <Function onClick={() => setWriteComnt(!wrtieComnt)}>
          <FontAwesomeIcon icon={faCommentDots} />
        </Function>
        <Function disabled={!isLogged} active={isBookmarked}>
          <FontAwesomeIcon icon={isBookmarked ? solBookmark : reBookMark} />
        </Function>
      </Container>
      {wrtieComnt && (
        <TextAreaContainer>
          <CustomTextArea
            placeholder="댓글 달기"
            value={myComment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMyComment(e.target.value)}
          />
          <Button icon={faPlus} theme="noBg" onClick={() => null} />
        </TextAreaContainer>
      )}
    </>
  );
};
