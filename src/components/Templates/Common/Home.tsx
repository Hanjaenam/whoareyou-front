import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import Aside from 'components/Aside';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';
import AsideModal from 'components/AsideModal';
import Header from 'components/Common/Header';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 2000px;
  margin: 0 auto;
`;

const Layout = styled.div`
  flex: 1;
  display: flex;
  margin-top: ${props => props.theme.height.header};
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: ${props => props.theme.height.header};
  }
`;

const Main = styled.main<{ contractAside: boolean }>`
  flex: 1;
  margin-left: ${props => props.theme.width.aside.xl};
  ${props =>
    props.contractAside &&
    css`
      margin-left: ${props.theme.width.aside.lg};
    `}
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    margin-left: ${props => props.theme.width.aside.lg};
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    margin-left: 0;
  }
`;

interface IProps {
  children: ReactNode;
}

export default ({ children }: IProps) => {
  const contractAside = useSelector((state: AppState) => state.header.contract.aside);

  return (
    <Container>
      <Header />
      <Layout>
        <Aside />
        <Main contractAside={contractAside}>{children}</Main>
      </Layout>
      <AsideModal />
    </Container>
  );
};
