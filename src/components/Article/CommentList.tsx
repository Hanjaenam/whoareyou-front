import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
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
`;

const CommentNumber = styled.span`
  ${blueColorClick}
  font-size: ${props => props.theme.fontSize.small};
  font-weight: 500;
  user-select: none;
  display:inline-block;
  margin:${props => props.theme.gap.tiny};
`;

interface IProps {
  history: {
    push: (path: string) => void;
  };
}

const CommentList = ({ history: { push } }: IProps) => {
  const data = useContext(ArticleContext);
  const { comments, commentNumber, id: articleId } = useSelector(
    (state: AppState) => state.articleArr[data.index],
  );
  const { process } = useApi(commentApi.getAll, 'home');
  const [state, setState] = useState({
    expand: false,
    processed: false,
    page: 0,
  });
  const dispatch = useDispatch();

  // 2번째 펼치기 이후부턴 api 사용하지 않도록
  const expandComment = () =>
    state.processed
      ? setState(s => ({ ...s, expand: true }))
      : process({ page: state.page, articleId }).then((res: { data: GetAll }) => {
          dispatch(expandComments({ index: data.index, comments: res.data }));
          setState(s => ({ ...s, expand: true, processed: true }));
        });

  return (
    <Container>
      {comments.map((comment, index) =>
        !state.expand && index >= 3 ? null : (
          <Comment
            key={comment.id}
            id={comment.id}
            index={index}
            content={comment.content}
            createdAt={comment.createdAt}
            creator={comment.creator}
            creatorId={comment.creatorId}
            push={push}
          />
        ),
      )}
      {commentNumber <= 3 ? null : (
        <CommentNumber
          onClick={state.expand ? () => setState(s => ({ ...s, expand: false })) : expandComment}
        >
          {state.expand ? '댓글 접기' : '댓글 더 보기'}
        </CommentNumber>
      )}
    </Container>
  );
};

export default withRouter(CommentList);
