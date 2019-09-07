import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { LinkStyle } from 'styles/mixins/etc';

const Container = styled.aside`
  position: fixed;
  height: ${props => `calc(100vh - ${props.theme.height.header})`};
  width: ${props => props.theme.width.aside};
  background-color: ${props => props.theme.colors.aside()};
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

const Menu = styled.ul``;

const Icon = styled(FontAwesomeIcon)`
  font-size: ${props => props.theme.fontSize.huge};
  margin-right: ${props => props.theme.gap.medium};
`;

const Item = styled.li`
  display: block;
`;

const SLink = styled(NavLink)`
  ${LinkStyle('aside')}
`;

const Aside = () => (
  <Container>
    <Menu>
      <Item>
        <SLink to="/">
          <Icon icon={faClock} />
          최신
        </SLink>
      </Item>
      <Item>
        <SLink to="/tag">
          <Icon icon={faFireAlt} />
          인기
        </SLink>
      </Item>
    </Menu>
  </Container>
);

export default Aside;
