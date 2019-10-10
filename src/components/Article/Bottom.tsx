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
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducer';
import { useInputWithSet, useApi } from 'hooks';
import TextArea from 'react-autosize-textarea';
import Button from 'components/Common/Button';
import { ArticleContext } from 'context/article';
import commentApi from 'api/comment';
import { IComment } from 'store/articleArr/types';
import {
  createComment,
  createLike,
  removeLike,
  createBookmark,
  removeBookmark,
} from 'store/articleArr/actions';
import likeApi from 'api/like';
import bookmarkApi from 'api/bookmark';

const Container = styled.div`
  display: flex;
  border-top: 1px solid ${props => props.theme.colors.secondary};
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

const Number = styled.span`
  margin-left: ${props => props.theme.gap.tiny};
`;

const FunButton = styled.div<{ disabled?: boolean; active?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.gap.small};
  transition: 0.2s;
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.gap.tiny};
  }
  ${props =>
    props.disabled
      ? css`
          cursor: not-allowed;
          background-color: ${props.theme.colors.secondary};
          opacity: 0.5;
        `
      : css`
          &:hover {
            opacity: 0.85;
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
    `};
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
  const { value: comment, setValue: setComment } = useInputWithSet();
  const [wrtieComnt, setWriteComnt] = useState(false);
  const { process } = useApi(commentApi.create, 'home');
  const { isLiked, likeNumber, isBookmarked, id, commentNumber } = useSelector(
    (state: AppState) => state.articleArr[data.index],
  );
  const dispatch = useDispatch();

  const onCreateComment = () =>
    process({ articleId: id, content: comment }).then((res: { data: IComment }) => {
      setComment('');
      setWriteComnt(false);
      dispatch(createComment({ index: data.index, ...res.data }));
    });

  const onLikeClick = () => {
    if (isLiked) {
      dispatch(removeLike(data.index));
      likeApi.remove({ articleId: id });
    } else {
      dispatch(createLike(data.index));
      likeApi.create({ articleId: id });
    }
  };

  const onBookmarkClick = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(data.index));
      bookmarkApi.remove({ articleId: id });
    } else {
      dispatch(createBookmark(data.index));
      bookmarkApi.create({ articleId: id });
    }
  };

  return (
    <>
      <Container>
        <FunButton active={isLiked} onClick={onLikeClick}>
          <FontAwesomeIcon icon={isLiked ? solThumbsUp : reThumbsUp} />
          <Number>{likeNumber}</Number>
        </FunButton>
        <FunButton onClick={() => setWriteComnt(!wrtieComnt)}>
          <FontAwesomeIcon icon={faCommentDots} />
          <Number>{commentNumber}</Number>
        </FunButton>
        <FunButton active={isBookmarked} onClick={onBookmarkClick}>
          <FontAwesomeIcon icon={isBookmarked ? solBookmark : reBookMark} />
        </FunButton>
      </Container>
      {wrtieComnt && (
        <TextAreaContainer>
          <CustomTextArea
            placeholder="댓글 달기"
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
          />
          <Button icon={faPlus} theme="noBg" onClick={onCreateComment} />
        </TextAreaContainer>
      )}
    </>
  );
};
