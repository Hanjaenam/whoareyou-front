import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Aside from 'components/Aside';
import LeftAsideModal from 'components/LeftAsideModal';
import Notification from 'components/Common/Notification';
import Header from '../Common/Header';

interface IProps {
  children: ReactNode;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Layout = styled.div`
  flex: 1;
  display: flex;
`;

const Main = styled.main`
  background: ${props => props.theme.colors.bg};
  flex: 1;
`;

export default ({ children }: IProps) => (
  <Container>
    <LeftAsideModal />
    <Header />
    <Layout>
      <Aside />
      <Main>{children}</Main>
    </Layout>
    <Notification home />
  </Container>
);
