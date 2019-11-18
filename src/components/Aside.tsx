import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';
import TempAvatar from 'assets/avatar.png';

interface IProps {
  modal?: boolean;
}

const Menu = styled.ul``;

const Icon = styled(FontAwesomeIcon)`
  font-size: ${props => props.theme.fontSize.huge};
  margin-right: ${props => props.theme.gap.medium};
`;

const Item = styled.li``;

const linkCss = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
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

const SLink = styled(NavLink)`
  ${linkCss}
  padding: ${props => props.theme.gap.medium} ${props => props.theme.gap.large};
  font-size: ${props => props.theme.fontSize.medium};
`;

const Line = styled.div`
  height: 1px;
  background-color: ${props => props.theme.colors.secondary};
  margin: ${props => props.theme.gap.tiny} 0;
`;

const FollowContainer = styled.div``;

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
  ${FollowContainer}, ${Line} {
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

const FollowLink = styled(NavLink)`
  ${linkCss};
  padding: ${props => props.theme.gap.tiny} ${props => props.theme.gap.medium};
`;

const FollowAvatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: ${props => props.theme.borderRadius.avatar};
  margin-right: ${props => props.theme.gap.small};
`;

const FollowName = styled.p``;

const Aside = ({ modal }: IProps) => {
  const contract = useSelector((state: AppState) => state.header.contract.aside);
  const isLogged = useSelector((state: AppState) => state.user.id !== -1);
  const { follows } = useSelector((state: AppState) => state.user);
  return (
    <Container contract={contract} modal={modal}>
      <Menu>
        <Item>
          <SLink to="/latest">
            <Icon icon={faClock} />
            <span>최신</span>
          </SLink>
        </Item>
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
            <FollowContainer>
              <Text>팔로우</Text>
              {follows &&
                follows.map(follow => (
                  <FollowLink key={follow.id} to={`/user/${follow.id}`}>
                    <FollowAvatar src={follow.avatar || TempAvatar} />
                    <FollowName>{follow.name}</FollowName>
                  </FollowLink>
                ))}
            </FollowContainer>
          </>
        )}
      </Menu>
    </Container>
  );
};

export default Aside;
