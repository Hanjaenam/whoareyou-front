import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Aside from 'components/Aside';
import Button from 'components/Common/Button';
import linkCss from 'styles/mixins/link';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { black } from 'styles/mixins/etc';
import { useDispatch, useSelector } from 'react-redux';
import { hideAsideModal } from 'store/header/actions';
import { AppState } from 'store/reducer';
import { myTheme } from 'styles/theme';

const Black = styled.div<{ visible: boolean }>`
  position: fixed;
  ${black};
  ${props =>
    !props.visible &&
    css`
      display: none;
    `}
`;

const Container = styled.div<{ visible: boolean }>`
  display: none;
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    transition: 0.2s;
    box-sizing: border-box;
    display: block;
    position: fixed;
    transform: translateX(-100%);
    height: 100vh;
    z-index: ${props => props.theme.zIndex.asideModal};
    ${props =>
      props.visible &&
      css`
        transform: translateX(0);
      `}
    background-color: white !important;
  }
`;

const Header = styled.div`
  background-color: white;
  display: flex;
  height: ${props => props.theme.height.header};
  align-items: center;
  padding-left: ${props => props.theme.gap.medium};
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
`;

const CustomLink = styled(Link)`
  ${linkCss.basic}
  ${linkCss.noBg}
`;

export default () => {
  const dispatch = useDispatch();
  const visible = useSelector((state: AppState) => state.header.visible.asideModal);
  const resizeHandler = () => {
    if (window.innerWidth > parseInt(myTheme.breakpoints.lg, 10)) {
      dispatch(hideAsideModal());
    }
  };
  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.addEventListener('resize', resizeHandler);
    };
  }, []);
  return (
    <>
      <Container visible={visible}>
        <Header>
          <Button icon={faBars} theme="noBg" onClick={() => dispatch(hideAsideModal())} />
          <CustomLink to="/latest">WhoAreYou</CustomLink>
        </Header>
        <Aside modal />
      </Container>
      <Black visible={visible} onClick={() => dispatch(hideAsideModal())} />
    </>
  );
};
