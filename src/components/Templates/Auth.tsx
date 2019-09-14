import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Notification from '../Common/Notification';

interface IProps {
  children: ReactNode;
}

const Container = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  height: 100vh;
  min-height: ${props => props.theme.breakpoints.md};
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  display: flex;
  min-height: 80px;
  justify-content: center;
  align-items: center;
  flex: 0.45;
  background-color: ${props => props.theme.colors.main};
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    flex: 0.25;
  }
`;

const Gretting = styled.p`
  font-size: 2rem;
  text-indent: 1rem;
  color: white;
`;

const Right = styled.div`
  flex: 0.55;
  background-color: ${props => props.theme.colors.bg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div {
    max-width: 550px;
    width: 95%;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    flex: 0.75;
    justify-content: flex-start;
    padding-top: 3rem;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-top: 2rem;
  }
`;

const Main = styled.main`
  width: 95%;
  max-width: ${props => props.theme.width.max.authMain};
  margin: 0 auto;
  background-color: white;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.basic};
  padding: ${props => props.theme.gap.huge};
  position: relative;
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.gap.large};
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: ${props => props.theme.gap.large};
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.gap.medium};
  }
`;

export default ({ children }: IProps) => (
  <Container>
    <Left>
      <Gretting>WhoAreYou</Gretting>
    </Left>
    <Right>
      <Main>{children}</Main>
    </Right>
    <Notification top right />
  </Container>
);
