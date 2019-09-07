import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducer';
import { Link } from 'react-router-dom';
import { logOut } from 'store/user/actions';
import { hideUserPopover } from 'store/header/actions';

const Container = styled.div`
  position: absolute;
  border-radius: ${props => props.theme.borderRadius.basic};
  top: 40px;
  right: 0;
  width: 120px;
  background-color: white;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const Menu = styled.ul``;

const Item = styled.li`
  display: block;
`;

const buttonEffect = css`
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colors.font};
    background-color: ${props => props.theme.colors.aside()};
  }
  &:active {
    background-color: ${props =>
      props.theme.colors.aside({ r: '-10', g: '-10', b: '-10' })};
  }
  user-select: none;
`;

const SLink = styled(Link)`
  text-decoration: none;
  display: block;
  padding: ${props => props.theme.gap.small} ${props => props.theme.gap.large};
  ${buttonEffect}
`;

const LogOut = styled.div`
  padding: ${props => props.theme.gap.small} ${props => props.theme.gap.large};
  ${buttonEffect}
`;

export default () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state: AppState) => state.user);
  const userPopover = useSelector(
    (state: AppState) => state.header.visible.userPopover,
  );

  return userPopover ? (
    <Container>
      <Menu>
        <Item>
          <SLink to={`/user/${id}`} onClick={() => dispatch(hideUserPopover())}>
            유저정보
          </SLink>
        </Item>
        <Item>
          <LogOut
            onClick={() => {
              dispatch(hideUserPopover());
              dispatch(logOut());
            }}
          >
            로그아웃
          </LogOut>
        </Item>
      </Menu>
    </Container>
  ) : null;
};
