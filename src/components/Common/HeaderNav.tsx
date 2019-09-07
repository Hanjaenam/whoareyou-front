import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { LinkStyle } from 'styles/mixins/etc';

const Container = styled.nav`
  width: 100vw;
  display: none;
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    display: block;
    height: ${props => props.theme.height.nav};
  }
`;
const Menu = styled.ul`
  display: flex;
`;

const Item = styled.li`
  flex: 1;
`;

const SLink = styled(NavLink)`
  ${LinkStyle('nav')}
  text-align:center;
`;

export default () => (
  <Container>
    <Menu>
      <Item>
        <SLink to="/">최신</SLink>
      </Item>
      <Item>
        <SLink to="/tag">인기</SLink>
      </Item>
    </Menu>
  </Container>
);
