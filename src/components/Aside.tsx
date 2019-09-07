import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { sideLink } from 'styles/mixins/etc';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';

interface IProps {
  modal?: boolean;
}

const Container = styled.aside<{ contract: boolean; modal: boolean }>`
  ${props =>
    !props.modal &&
    css`
    width: ${props.theme.width.aside};
    background-color: ${props.theme.colors.aside()};
      /* contract가 true일 때는 크기를 축소시켜줍니다. */
      ${props.contract &&
        css`
          width: auto;
          ul {
            li a {
              padding: ${props.theme.gap.medium};
            }
          }
        `}
        @media screen and (max-width: ${props.theme.breakpoints.lg}) {
          /* 1024px보다 웹 크기가 작으면 width는 고정으로 축소됩니다. -> contract가 변경되도 아무 반응이 없어집니다. */
          width: auto;
          ul {
            li a {
              padding: ${props.theme.gap.medium};
            }
          }
        }
        @media screen and (max-width: ${props.theme.breakpoints.sm}) {
          ul li a {
            display: none;
          }
        }
  `};
`;

const Menu = styled.ul``;

const Item = styled.li`
  display: block;
`;

const SLink = styled(Link)`
  padding: ${props => props.theme.gap.medium} ${props => props.theme.gap.huge};
  ${sideLink}
`;

const Aside = ({ modal = false }: IProps) => {
  const contract = useSelector(
    (state: AppState) => state.header.contract.aside,
  );
  return (
    <Container contract={contract} modal={modal}>
      <Menu>
        <Item>
          <SLink to="/">최신</SLink>
        </Item>
        <Item>
          <SLink to="/tag">인기</SLink>
        </Item>
        {/* <Item>
<SLink to="/tag">구독</SLink>
</Item> */}
      </Menu>
    </Container>
  );
};
export default Aside;
