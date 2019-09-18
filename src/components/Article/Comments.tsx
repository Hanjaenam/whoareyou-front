import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { blueColorClick } from 'styles/mixins/etc';
import { useData } from 'context/article';

const CommentContainer = styled.div`
  margin: ${props => props.theme.gap.small};
  margin-top: ${props => props.theme.gap.tiny};
`;

const Container = styled.div`
  display: flex;
  & + & {
    margin-top: ${props => props.theme.gap.tiny};
  }
`;

const Author = styled.p`
  color: ${props => props.theme.colors.blue};
  margin-right: ${props => props.theme.gap.tiny};
  ${blueColorClick}
`;

const Comment = styled.p``;

const number = css`
  font-size: 14px;
  font-weight: 500;
  user-select: none;
`;

const CommentNumber = styled.div`
  ${number};
  margin-top: ${props => props.theme.gap.tiny};
  span {
    ${blueColorClick}
  }
`;

export default () => {
  const [visibleComnt, setVisComnt] = useState(false);
  const data = useData();
  if (data === null) return null;
  const { comments, commentNumber } = data;
  return (
    <CommentContainer>
      {comments.map(comment => (
        <Container key={comment.id}>
          <Author>{comment.creator}</Author>
          <Comment>{comment.content}</Comment>
        </Container>
      ))}
      <CommentNumber onClick={() => setVisComnt(!visibleComnt)}>
        <span>댓글 {commentNumber}개 모두 보기</span>
      </CommentNumber>
    </CommentContainer>
  );
};
