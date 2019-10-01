import React, { useState, useContext, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { blueColorClick } from 'styles/mixins/etc';
import { ArticleContext } from 'context/article';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducer';
import { useApi } from 'hooks';
import commentApi from 'api/comment';
import { expandComments } from 'store/articleArr/actions';
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
  const [processed, setProcessed] = useState(false);
  const dispatch = useDispatch();

  // 2번째 펼치기 이후부턴 api 사용하지 않도록
  const getAllComment = () =>
    processed
      ? setExpand(true)
      : process({ articleId }).then((res: { data: GetAll }) => {
          console.log(res.data);
          dispatch(expandComments({ index: data.index, comments: res.data }));
          setExpand(true);
          setProcessed(true);
        });

  const renderCommentNumber = useMemo(() => {
    if (commentNumber <= 3) return null;
    return (
      <CommentNumber onClick={expand ? () => setExpand(false) : getAllComment}>
        <span>{expand ? '댓글 접기' : '댓글 더 보기'}</span>
      </CommentNumber>
    );
  }, [expand]);

  return (
    <Container>
      {comments.map(
        (
          comment: { id: number; creator: string; content: string; createdAt: string },
          index: number,
        ) =>
          !expand && index >= 3 ? null : (
            <Comment
              key={comment.id}
              id={comment.id}
              index={index}
              creator={comment.creator}
              content={comment.content}
              createdAt={comment.createdAt}
            />
          ),
      )}
      {renderCommentNumber}
    </Container>
  );
};
