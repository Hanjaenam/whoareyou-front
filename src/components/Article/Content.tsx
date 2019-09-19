import React, { useContext } from 'react';
import styled from 'styled-components';
import { blueColorClick } from 'styles/mixins/etc';
import { ArticleContext } from 'context/article';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';

const Container = styled.div`
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
  const data = useContext(ArticleContext);
  const { content } = useSelector((state: AppState) => state.articleArr[data.index]);

  return content !== 'undefined' ? (
    <Container>
      <Content>
        {content}
        {content.length >= 200 && <MoreContent>더보기</MoreContent>}
      </Content>
    </Container>
  ) : null;
};
