import React from 'react';
import styled from 'styled-components';
import Bottom from 'components/Article/Bottom';
import PhotoSlider from 'components/Article/PhotoSlider';
import CommentList from 'components/Article/CommentList';
import Top from 'components/Article/Top';
import Content from 'components/Article/Content';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';

const Container = styled.article`
  position: relative;
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

export default () => {
  const isLogged = useSelector((state: AppState) => state.user.id !== -1);
  return (
    <Container>
      <Top />
      <PhotoSlider />
      <Content />
      <CommentList />
      {isLogged ? <Bottom /> : null}
    </Container>
  );
};
