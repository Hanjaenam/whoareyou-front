import React, { ReactNode } from 'react';
import styled from 'styled-components';

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

export default ({ children }: IProps) => (
  <Container>
    <ArticleContainer>{children}</ArticleContainer>
  </Container>
);
