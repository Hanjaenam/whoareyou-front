import React, { useState, useContext, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { blueColorClick } from 'styles/mixins/etc';
import { ArticleContext } from 'context/article';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducer';
import { useApi } from 'hooks';
import commentApi from 'api/comment';
import { setComment } from 'store/articleArr/actions';
import { GetAll } from 'types/apiRes/comment';
import Comment from './Comment';

const Container = styled.div`
  margin: 0 ${props => props.theme.gap.tiny};
  margin-bottom: ${props => props.theme.gap.tiny};
`;

const number = css`
  font-size: 14px;
  font-weight: 500;
  user-select: none;
`;

const CommentNumber = styled.div`
  ${number};
  margin-top: ${props => props.theme.gap.small};
  margin-left: ${props => props.theme.gap.tiny};
  span {
    ${blueColorClick}
  }
`;

export default () => {
  const data = useContext(ArticleContext);
  const { comments, commentNumber, id: articleId } = useSelector(
    (state: AppState) => state.articleArr[data.index],
  );
  const { process, loading } = useApi(commentApi.getAll, 'home');
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();

  const getAllComment = () => {
    process({ articleId }).then((res: { data: GetAll }) => {
      setExpand(true);
      dispatch(setComment({ index: data.index, comments: res.data }));
    });
  };

  const renderCommentNumber = useMemo(() => {
    if (commentNumber <= 3) return null;
    if (!expand)
      return (
        <CommentNumber onClick={getAllComment}>
          <span>남은 댓글 {commentNumber - 3}개 모두 보기</span>
        </CommentNumber>
      );
    return (
      <CommentNumber onClick={getAllComment}>
        <span>댓글 접기</span>
      </CommentNumber>
    );
  }, [expand]);

  return (
    <Container>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          id={comment.id}
          creator={comment.creator}
          content={comment.content}
          createdAt={comment.createdAt}
        />
      ))}
      {renderCommentNumber}
    </Container>
  );
};
