import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Button from 'components/Common/Button';
import linkCss from 'styles/mixins/link';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  faPlus,
  faBars,
  faUserFriends,
  faSearch,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { AppState } from 'store/reducer';
import {
  toggleVisiblePopover,
  hideUserPopover,
  toggleContractAside,
  showAsideModal,
  showSearchInput,
  hideSearchInput,
} from 'store/header/actions';
import { myTheme } from 'styles/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserPopover from 'components/User/Popover';
import Search from 'components/Search';
import { noBg } from 'styles/mixins/button';

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: ${props => props.theme.gap.small};
  align-items: center;
  > div:first-child {
    justify-content: center;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    display: flex;
    justify-content: flex-end;
  }
`;

const UserContainer = styled.div`
  position: relative;
`;

const CustomLink = styled(Link)`
  ${linkCss.basic}
  ${linkCss.noBg}
`;

const CustomNavLink = styled(NavLink)`
  ${linkCss.basic}
  ${linkCss.noBg}
  &.active {
    background-color: ${props => props.theme.colors.main};
    > svg {
      color: white;
    }
  }
  margin-left: 5px;
`;

const Icon = styled.div`
  ${noBg({ color: 'main', padding: 'tiny', disabled: false, loading: false })}
  display:none;
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    justify-self: flex-start;
    display: block;
  }
`;

const SmSearchContainer = styled.div<{ visible: boolean }>`
  display: none;
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    display: ${props => props.visible && 'flex'};
    flex: 1;
  }
`;

const Container = styled.header<{ smSearchInput: boolean }>`
  transition: height 0.2s;
  position: fixed;
  max-width: 2000px;
  width: 100vw;
  z-index: ${props => props.theme.zIndex.header};
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: auto 1fr;
  grid-gap: ${props => props.theme.gap.small};
  align-items: center;
  height: ${props => props.theme.height.header};
  padding: 0 ${props => props.theme.gap.medium};
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
  background-color: white;
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.gap.tiny};
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    display: flex;
    ${props =>
      props.smSearchInput
        ? css`
            justify-content: center;
            ${Flex}, ${Right} {
              display: none;
            }
          `
        : css`
            justify-content: space-between;
          `}
  }
`;

export default () => {
  const username = useSelector((state: AppState) => state.user.name);
  const userVisible = useSelector((state: AppState) => state.header.visible.userPopover);
  const dispatch = useDispatch();
  const { input: inputVisible } = useSelector((state: AppState) => state.header.visible.search);
  const hideUserPopoverHandler = () => userVisible && dispatch(hideUserPopover());

  // 만약 deps를 [] 로만 설정하면 맨 처음 mount될때에만 event를 생성하여 추가하므로 visibl을 이벤트 함수 내에서 읽으면 항상 false이다.
  // 왜냐하면 이벤트는 한 번 추가되었고 그 추가되었을 당시에는 visible은 false이니 visible이 변경된다 한들, 이벤트함수는 여전히 visible을 false로 인식하는 것.
  // useEffect(() => {
  //   window.addEventListener('click', hideUserPopoverHandler);
  //   return () => window.removeEventListener('click', hideUserPopoverHandler);
  // }, []);
  // * react는 새로 렌더링될 때마다 모든 함수와 모든 변수들을 새로 만들고 다시 시작한다.
  // * visible이 변경될때마다 기존에 있던 함수는 제거(return)하고 새로운 함수를 넣어주는 것이다.
  useEffect(() => {
    // * 이후 visible이 true됐을 때의 리렌더링이 된 component가 새로운 함수를 다시 추가시켜주는 것!
    window.addEventListener('click', hideUserPopoverHandler);
    // * visible 초기값 false이 "true"로 변경되면 기존에 있던 함수를 제거하는 것임.
    return () => window.removeEventListener('click', hideUserPopoverHandler);
  }, [userVisible]);

  const onBarsClick = () => {
    // lg 에서 축소, 확장 불가 ( 확장 시 article 크기 초과 )
    if (window.innerWidth > parseInt(myTheme.breakpoints.lg, 10)) {
      dispatch(toggleContractAside());
    } else {
      dispatch(showAsideModal());
    }
  };
  const resizeHandler = () => {
    if (!inputVisible && window.innerWidth > parseInt(myTheme.breakpoints.sm, 10)) {
      dispatch(hideSearchInput());
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.addEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <Container smSearchInput={inputVisible}>
      <SmSearchContainer visible={inputVisible}>
        <Icon onClick={() => dispatch(hideSearchInput())} style={{ fontSize: '1.4rem' }}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Icon>
        <Search visible={inputVisible} />
      </SmSearchContainer>
      <Flex>
        <Button icon={faBars} theme="noBg" onClick={onBarsClick} />
        <CustomLink to="/latest">WhoAreYou</CustomLink>
      </Flex>
      <Right>
        <Search />
        <Flex>
          <Icon onClick={() => dispatch(showSearchInput())}>
            <FontAwesomeIcon icon={faSearch} />
          </Icon>
          {username && (
            <>
              <CustomNavLink to="/users">
                <FontAwesomeIcon icon={faUserFriends} />
              </CustomNavLink>
              <CustomNavLink to="/new">
                <FontAwesomeIcon icon={faPlus} />
              </CustomNavLink>
            </>
          )}
          <UserContainer className="username">
            {username ? (
              <Button
                theme="noBg"
                onClick={e => {
                  e.stopPropagation();
                  dispatch(toggleVisiblePopover());
                }}
              >
                {username}
              </Button>
            ) : (
              <CustomLink to="/">로그인</CustomLink>
            )}
            <UserPopover />
          </UserContainer>
        </Flex>
      </Right>
    </Container>
  );
};

// scroll만 된다고 호출되는 게 아닌 듯, 홈페이지 자체가 스크롤이 있고 스크롤이 내려가져야 호출이 된다.
// const onScroll = (_: Event) => {
//   if (window.innerWidth > parseInt(myTheme.breakpoints.md, 10)) return;
//   // console.log(document.body.scrollHeight); // 전체
//   // console.log(document.body.clientHeight); // 현재 내가 보고 있는 창의 높이
//   if (window.scrollY > 80) dispatch(setContractHeader(true));
//   else dispatch(setContractHeader(false));
// };
// useEffect(() => {
//   window.addEventListener('scroll', onScroll);
//   return () => {
//     window.removeEventListener('scroll', onScroll);
//   };
// }, []);
