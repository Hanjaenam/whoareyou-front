import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { faPlus, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useInputWithSet } from 'hooks';
import TextArea from 'react-autosize-textarea';
import Button from 'components/Common/Button';
import Func from 'components/Article/Func';
import { blueColorClick } from 'styles/mixins/etc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comment from './Comment';
import Creator from './Creator';

interface IProps {
  id: number;
  creator: string;
  creatorAvt: string | null;
  content: string;
  photos: [{ id: number; location: string }];
  likeNumber: number;
  commentNumber: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
  comments: [{ id: number; creator: string; content: string }];
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

const ImageContainer = styled.div`
  position: relative;
`;

const ImageSlider = styled.div<{ index: number }>`
  display: flex;
  transition-duration: 0.5s, 0.3s;
  transition-timing-function: linear ease;
  transform: ${props => `translateX(-${100 * props.index}%)`};
`;

const AngleIcon = styled.div<{ left?: boolean; right?: boolean }>`
  position: absolute;
  z-index: ${props => props.theme.zIndex.header};
  background-color: rgba(255, 255, 255, 0.6);
  ${props =>
    props.left &&
    css`
      left: 0;
      border-top-right-radius: ${props.theme.borderRadius};
      border-bottom-right-radius: ${props.theme.borderRadius};
    `}
  ${props =>
    props.right &&
    css`
      right: 0;
      border-top-left-radius: ${props.theme.borderRadius};
      border-bottom-left-radius: ${props.theme.borderRadius};
    `}
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.gap.huge} 0;
  > svg {
    font-size: ${props => props.theme.fontSize.medium};
  }
`;

const Image = styled.div<{ url: string }>`
  width: 100%;
  flex-shrink: 0;
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
  word-wrap: break-word;
  line-height: 1.2rem;
`;

// 최대 200 글자까지
const Content = styled.p`
  overflow: hidden;
`;

const MoreContent = styled.span`
  margin-left: ${props => props.theme.gap.small};
  ${blueColorClick}
`;

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

const CommentContainer = styled.div`
  margin: ${props => props.theme.gap.small};
  margin-top: ${props => props.theme.gap.tiny};
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
  creator,
  creatorAvt,
  photos,
  content,
  likeNumber,
  commentNumber,
  isLiked,
  isBookmarked,
  createdAt,
  comments,
}: IProps) => {
  const [photoIndex, setIndex] = useState(0);
  const { value: myComment, setValue: setMyComment } = useInputWithSet();
  const [wrtieComnt, setWriteComnt] = useState(false);
  const [visibleComnt, setVisComnt] = useState(false);
  return (
    <Container>
      <Creator avatar={creatorAvt} creator={creator} createdAt={createdAt} />
      <ImageContainer>
        {photoIndex !== 0 && (
          <AngleIcon
            left
            onClick={() => {
              if (photoIndex - 1 < 0) return;
              setIndex(photoIndex - 1);
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </AngleIcon>
        )}
        <ImageSlider index={photoIndex}>
          {photos.map(photo => (
            <Image key={photo.id} url={photo.location} />
          ))}
        </ImageSlider>
        {photoIndex !== photos.length - 1 && (
          <AngleIcon
            right
            onClick={() => {
              if (photoIndex + 1 >= photos.length) return;
              setIndex(photoIndex + 1);
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </AngleIcon>
        )}
      </ImageContainer>
      {content && (
        <ContentContainer>
          <Content>
            {content}
            {content.length >= 200 && <MoreContent>더보기</MoreContent>}
          </Content>
        </ContentContainer>
      )}
      <CommentContainer>
        {comments.map(comment => (
          <Comment key={comment.id} creator={comment.creator} content={comment.content} />
        ))}
        <CommentNumber onClick={() => setVisComnt(!visibleComnt)}>
          <span>댓글 {commentNumber}개 모두 보기</span>
        </CommentNumber>
      </CommentContainer>
      <Func
        likeNumber={likeNumber}
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
