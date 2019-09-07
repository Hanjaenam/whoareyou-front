import React from 'react';
import styled, { css } from 'styled-components';
import { hideAsideModal } from 'store/header/actions';
import { useDispatch, useSelector } from 'react-redux';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AppState } from 'store/reducer';
import Button from './Common/Button';
import Aside from './Aside';

const Container = styled.div<{ visible: boolean }>`
  display: none;
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    transition: 0.2s;
    box-sizing: border-box;
    display: block;
    position: absolute;
    transform: translateX(-100%);
    height: 100vh;
    width: ${props => props.theme.width.aside};
    z-index: 1;
    ${props =>
      props.visible &&
      css`
        transform: translateX(0);
      `}
    background-color: white !important;
  }
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${props => props.theme.gap.medium};
  border-bottom: 1px solid ${porps => porps.theme.colors.secondary};
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.gap.medium};
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.gap.tiny};
  }
  height: ${props => props.theme.height.header};
`;

const Black = styled.div<{ visible: boolean }>`
  ${props =>
    props.visible &&
    css`
      @media screen and (max-width: ${props.theme.breakpoints.lg}) {
        z-index: 1;
        position: absolute;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.3);
      }
    `}
`;

export default () => {
  const dispatch = useDispatch();
  const visible = useSelector(
    (state: AppState) => state.header.visible.asideModal,
  );
  return (
    <>
      <Black visible={visible} onClick={() => dispatch(hideAsideModal())} />
      <Container visible={visible}>
        <HeadContainer>
          <Button
            theme="noBg"
            onClick={() => dispatch(hideAsideModal())}
            icon={faBars}
          />
          <Button theme="noBg">WhoAreYou</Button>
        </HeadContainer>
        <Aside modal />
      </Container>
    </>
  );
};
