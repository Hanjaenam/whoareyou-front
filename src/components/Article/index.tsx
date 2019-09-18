import React from 'react';
import styled from 'styled-components';
import Bottom from 'components/Article/Bottom';
import { blueColorClick } from 'styles/mixins/etc';
import PhotoSlider from 'components/Article/PhotoSlider';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';
import { useData } from 'context/article';
import Comments from './Comments';
import Creator from './Creator';

const Container = styled.article`
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.basic};
  overflow: hidden;
  background-color: white;
  width: ${props => props.theme.width.article.container};
  margin: 0 auto;
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

export default () => {
  const data = useData();
  if (data === null) return null;
  const { content } = data;
  return (
    <Container>
      <Creator />
      <PhotoSlider />
      {content && (
        <ContentContainer>
          <Content>
            {content}
            {content.length >= 200 && <MoreContent>더보기</MoreContent>}
          </Content>
        </ContentContainer>
      )}
      <Comments />
      <Bottom />
    </Container>
  );
};
