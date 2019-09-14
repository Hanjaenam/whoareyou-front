import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';
import CreateArticle from 'components/Article/Create';

interface IProps {
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  padding: ${props => props.theme.gap.medium};
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.gap.small} 0;
  }
`;

const ArticleContainer = styled.div``;

export default ({ children }: IProps) => {
  const { createArticle } = useSelector((state: AppState) => state.header.visible);
  return (
    <Container>
      <ArticleContainer>{children}</ArticleContainer>
      {createArticle && <CreateArticle />}
    </Container>
  );
};
