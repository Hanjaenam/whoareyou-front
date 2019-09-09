import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useInputWithSet } from 'hooks';
import TextArea from 'react-autosize-textarea';
import Button from 'components/Common/Button';
import Func from 'components/Article/Func';
import { blueColorClick } from 'styles/mixins/etc';
import Comment from './Comment';
import Author from './Author';

interface IProps {
  id: string;
  author: string;
  authorAvt: string | null;
  content: string;
  files: string[];
  likeNumber: number;
  commentNumber: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
  comments: [{ id: string; author: string; content: string }];
}

const Container = styled.article`
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.basic};
  overflow: hidden;
  background-color: white;
  width: ${props => props.theme.width.article.container};
  & + & {
    margin-top: ${props => props.theme.gap.large};
  }
  @media screen and (max-width: 600px) {
    border-radius: 0;
    border-right: 0;
    border-left: 0;
    width: 100vw;
  }
`;

const ImageContainer = styled.div``;

const Image = styled.div<{ url: string }>`
  width: 100%;
  height: ${props => props.theme.width.article.image};
  background-image: url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: ${props => props.theme.width.article.image}) {
    height: 100vw;
  }
`;

const ContentContainer = styled.div`
  padding: ${props => props.theme.gap.small};
`;

// 최대 200 글자까지
const Content = styled.p`
  height: ${props => props.theme.height.articleContent};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 20px;
`;

const NumberContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${props => props.theme.gap.tiny};
`;

const number = css`
  padding: 0 ${props => props.theme.gap.tiny};
  user-select: none;
`;

const LikeNumber = styled.p`
  ${number};
`;

const CommentNumber = styled.div`
  ${number};
  ${blueColorClick}
`;

const CommentContainer = styled.div`
  margin-bottom: ${props => props.theme.gap.tiny};
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

/**
 * ToDo - 댓글 마무리 작업 (달기까지만 되있음, 댓글 보여주는 것도)
 * ToDo - 좋아요 갯수, 댓글 갯수 레이아웃
 */

export default ({
  id,
  author,
  authorAvt,
  files,
  content,
  likeNumber,
  commentNumber,
  isLiked,
  isBookmarked,
  createdAt,
  comments,
}: IProps) => {
  const { value: myComment, setValue: setMyComment } = useInputWithSet();
  const [wrtieComnt, setWriteComnt] = useState(false);
  const [visibleComnt, setVisComnt] = useState(false);
  return (
    <Container>
      <Author avatar={authorAvt} author={author} createdAt={createdAt} />
      <ImageContainer>
        {files.map(file => (
          <Image key={file} url={file} />
        ))}
      </ImageContainer>
      {content && (
        <ContentContainer>
          <Content>{content}</Content>
        </ContentContainer>
      )}
      <NumberContainer>
        <LikeNumber>좋아요 {likeNumber}</LikeNumber>
        <CommentNumber onClick={() => setVisComnt(!visibleComnt)}>
          댓글수 {commentNumber}
        </CommentNumber>
      </NumberContainer>
      {visibleComnt && (
        <CommentContainer>
          {comments.map(comment => (
            <Comment key={comment.id} author={comment.author} content={comment.content} />
          ))}
        </CommentContainer>
      )}
      <Func
        isLiked={isLiked}
        isBookmarked={isBookmarked}
        toggleWriteComnt={() => setWriteComnt(!wrtieComnt)}
      />
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
    </Container>
  );
};
