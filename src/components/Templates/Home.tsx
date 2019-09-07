import React, { ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import Aside from 'components/Aside';
import Notification from 'components/Common/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { setContractHeader } from 'store/header/actions';
import { AppState } from 'store/reducer';
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

const Layout = styled.div<{ contract: boolean }>`
  flex: 1;
  display: flex;
  margin-top: ${props =>
    props.contract
      ? props.theme.height.smallHeader
      : props.theme.height.header};
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    margin-top: ${props =>
      `calc(${
        props.contract
          ? props.theme.height.smallHeader
          : props.theme.height.header
      } + ${props.theme.height.nav})`};
  }
`;

const Main = styled.main`
  flex: 1;
  margin-left: ${props => props.theme.width.aside};
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    margin-left: 0;
  }
`;

export default ({ children }: IProps) => {
  const dispatch = useDispatch();
  const { contract } = useSelector((state: AppState) => state.header);

  // scroll만 된다고 호출되는 게 아닌 듯, 홈페이지 자체가 스크롤이 있고 스크롤이 내려가져야 호출이 된다.
  const onScroll = (_: Event) => {
    // console.log(document.body.scrollHeight); // 전체
    // console.log(document.body.clientHeight); // 현재 내가 보고 있는 창의 높이
    if (window.scrollY > 80) dispatch(setContractHeader(true));
    else dispatch(setContractHeader(false));
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Container>
      <Header />
      <Layout contract={contract}>
        <Aside />
        <Main>{children}</Main>
      </Layout>
      <Notification home />
    </Container>
  );
};
