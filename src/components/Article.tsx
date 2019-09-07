import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import tempAvatar from 'assets/avatar.png';
import {
  faExpand,
  faPlus,
  faBookmark as solBookmark,
  faThumbsUp as solThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import {
  faBookmark as reBookMark,
  faThumbsUp as reThumbsUp,
  faComments,
} from '@fortawesome/free-regular-svg-icons';
import { useInputWithSet } from 'hooks';
import TextArea from 'react-autosize-textarea';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';
import { basic } from 'styles/mixins/button';
import Icon from 'components/Common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  id?: number;
  avatar?: string | null;
  url?: string;
  title?: string;
  content?: string;
  author?: string;
  favorite?: number;
  isLiked?: boolean;
  isBookmared?: boolean;
  createdAt?: string;
}

const Container = styled.article`
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.basic};
  overflow: hidden;
  background-color: white;
  width: 602px;
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

const Top = styled.div`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.gap.small};
`;

interface IAvatar {
  url?: string | null;
}
const Avatar = styled.div<IAvatar>`
  background-image: ${props =>
    props.url ? `url(${props.url})` : `url(${tempAvatar})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  border-radius: ${props => props.theme.borderRadius.avatar};
  display: inline-block;
`;

const AuthorContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: ${props => props.theme.gap.small};
`;

const Author = styled.p``;

const CreatedAt = styled.p`
  opacity: 0.5;
  font-size: ${props => props.theme.fontSize.small};
  margin-top: ${props => props.theme.gap.tiny};
`;

const ImageContainer = styled.div``;

const Image = styled.div<{ url: string }>`
  width: 100%;
  height: 600px;
  background-image: url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: 600px) {
    height: 100vw;
  }
`;

const ContentContainer = styled.div`
  padding: ${props => props.theme.gap.small};
`;

const Content = styled.span`
  word-break: break-all;
`;

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

const Button = styled.div<{ disabled: boolean; active?: boolean }>`
  ${basic({ padding: 'small' })}
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
  &:active {
    transform: scale(0.98);
  }
  ${props =>
    props.active &&
    css`
      color: ${props.theme.colors.blue};
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

/**
 * ToDo - 댓글 마무리 작업 (달기까지만 되있음, 댓글 보여주는 것도)
 * ToDo - 좋아요 갯수, 댓글 갯수 레이아웃
 */

export default ({
  id = 1,
  avatar,
  author = 'author',
  url = 'https://cdn.pixabay.com/photo/2015/12/22/04/00/photo-1103595_960_720.png',
  content = 'contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent',
  favorite = 20,
  isLiked,
  isBookmared,
  createdAt = '2개월 전',
}: IProps) => {
  const { value: comment, setValue: setComment } = useInputWithSet();
  const [showUpComment, setShowUp] = useState(false);
  const isLogged = useSelector((state: AppState) => state.user).email !== '';
  return (
    <Container>
      <Top>
        <Avatar url={avatar} />
        <AuthorContainer>
          <div>
            <Author>{author}</Author>
            <CreatedAt>{createdAt}</CreatedAt>
          </div>
          <Icon icon={faExpand} theme="noBg" />
        </AuthorContainer>
      </Top>
      <ImageContainer>
        <Image url={url} />
      </ImageContainer>
      {content && (
        <ContentContainer>
          <Content>{content}</Content>
        </ContentContainer>
      )}
      <LikeContainer>
        <Button disabled={!isLogged} active={isLiked}>
          <FontAwesomeIcon icon={isLiked ? solThumbsUp : reThumbsUp} />
        </Button>
        <Button
          disabled={!isLogged}
          onClick={isLogged ? () => setShowUp(!showUpComment) : undefined}
        >
          <FontAwesomeIcon icon={faComments} />
        </Button>
        <Button disabled={!isLogged} active={isBookmared}>
          <FontAwesomeIcon icon={isBookmared ? solBookmark : reBookMark} />
        </Button>
      </LikeContainer>
      {showUpComment && (
        <TextAreaContainer>
          <CustomTextArea
            placeholder="댓글 달기"
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComment(e.target.value)
            }
          />
          <Icon icon={faPlus} theme="noBg" />
        </TextAreaContainer>
      )}
    </Container>
  );
};
