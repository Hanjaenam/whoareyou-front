import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';

interface IProps {
  modal?: boolean;
}

const Menu = styled.ul``;

const Icon = styled(FontAwesomeIcon)`
  font-size: ${props => props.theme.fontSize.huge};
  margin-right: ${props => props.theme.gap.medium};
`;

const Item = styled.li``;

const SLink = styled(NavLink)`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
  padding: ${props => props.theme.gap.medium} ${props => props.theme.gap.large};
  font-size: ${props => props.theme.fontSize.medium};
  border-right: 3px solid transparent;
  &:hover {
    background-color: ${props => props.theme.colors.aside({ r: '-20', g: '-20', b: '-20' })};
  }
  &:active {
    color: ${props => props.theme.colors.font};
    background-color: white;
    border-right: 3px solid ${props => props.theme.colors.blue};
  }
  &.active {
    background-color: white;
    border-right-color: ${props => props.theme.colors.blue};
    opacity: 1;
  }
`;

const Line = styled.div`
  height: 1px;
  background-color: ${props => props.theme.colors.secondary};
  margin: ${props => props.theme.gap.tiny} 0;
`;

const Text = styled.p`
  padding: ${props => props.theme.gap.tiny} ${props => props.theme.gap.large};
  user-select: none;
`;

const contractCss = css`
  width: ${props => props.theme.width.aside.lg};
  ${Icon} {
    font-size: ${props => props.theme.fontSize.large};
    margin-right: 0;
  }

  ${SLink} {
    flex-direction: column;
    font-size: ${props => props.theme.fontSize.small};
    padding: ${props => props.theme.gap.small} 0;
    span {
      margin-top: ${props => props.theme.gap.tiny};
      text-align: center;
    }
  }
  ${Text}, ${Line} {
    display: none;
  }
`;

const Container = styled.aside<{ contract: boolean; modal?: boolean }>`
  height: ${props => `calc(100vh - ${props.theme.height.header})`};
  width: ${props => props.theme.width.aside.xl};
  background-color: ${props => props.theme.colors.aside()};

  ${props =>
    !props.modal &&
    css`
      position: fixed;
      /**Home Template과 반응형 : martin-left */
      ${props.contract && contractCss};
      @media screen and (max-width: ${props.theme.breakpoints.lg}) {
        ${contractCss}
      }
      @media screen and (max-width: ${props.theme.breakpoints.md}) {
        display: none;
      }
    `}
`;

const Aside = ({ modal }: IProps) => {
  const contract = useSelector((state: AppState) => state.header.contract.aside);
  const isLogged = useSelector((state: AppState) => state.user.id !== -1);
  return (
    <Container contract={contract} modal={modal}>
      <Menu>
        <Item>
          <SLink to="/latest">
            <Icon icon={faClock} />
            <span>최신</span>
          </SLink>
        </Item>
        {/* <Item>
          <SLink to="/tag">
            <Icon icon={faFireAlt} />
            <span>인기</span>
          </SLink>
        </Item> */}
        {isLogged && (
          <>
            <Item>
              <SLink to="/bookmark">
                <Icon icon={faBookmark} />
                <span>북마크</span>
              </SLink>
            </Item>
            <Item>
              <SLink to="/favorite">
                <Icon icon={faThumbsUp} />
                <span>좋아요 표시한 글</span>
              </SLink>
            </Item>
            <Line />
            <Text>팔로우</Text>
          </>
        )}
      </Menu>
    </Container>
  );
};

export default Aside;
