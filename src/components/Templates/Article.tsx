import React, { ReactNode } from 'react';
import styled from 'styled-components';
import SubArticle from 'components/SubArticle';

interface IProps {
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: ${props => props.theme.gap.medium};
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: ${props => props.theme.gap.small};
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.gap.small} 0;
  }
`;

const ArticleContainer = styled.div``;

export default ({ children }: IProps) => (
  <Container>
    <ArticleContainer>{children}</ArticleContainer>
    <SubArticle />
  </Container>
);
