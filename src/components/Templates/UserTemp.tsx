import React, { ReactNode, useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import linkCss from 'styles/mixins/link';
import MyAvatar from 'components/User/Avatar';
import { MainHeightAboveLg, mainHeightBelowLg, articleContainer } from 'styles/mixins/etc';
import { UserContext } from 'pages/User';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducer';
import avatarCss from 'styles/mixins/avatar';
import Button from 'components/Common/Button';
import followApi from 'api/follow';
import { useApi } from 'hooks';
import { PushFollow, RemoveFollow } from 'store/user/actions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: ${MainHeightAboveLg};
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    min-height: ${mainHeightBelowLg};
  }
`;

const Top = styled.div`
  background-color: white;
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${props => props.theme.gap.large} 0;
  margin: 0 auto;
  width: 90%;
  max-width: 700px;
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    padding: ${props => props.theme.gap.medium};
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    padding: ${props => props.theme.gap.tiny};
  }
`;

const OtherAvatar = styled.div<{ url: null | string }>`
  ${props => avatarCss({ url: props.url, page: 'user' })};
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: ${props => props.theme.gap.small};
`;

const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.gap.small};
  padding-bottom: ${props => props.theme.gap.tiny};
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: ${props => props.theme.gap.tiny};
    padding-bottom: 0;
  }
`;

const Name = styled.p`
  font-size: 2rem;
  text-indent: ${props => props.theme.gap.medium};
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    text-indent: ${props => props.theme.gap.small};
    margin-bottom: ${props => props.theme.gap.tiny};
    padding-bottom: ${props => props.theme.gap.tiny};
    font-size: 1.5rem;
  }
`;

const EditProfile = styled(Link)`
  ${linkCss.basic}
  ${linkCss.border}
`;

const Introduce = styled.p`
  text-indent: ${props => props.theme.gap.medium};

  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    text-indent: ${props => props.theme.gap.small};
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
`;

const Item = styled.div`
  cursor: pointer;
  padding: ${props => props.theme.gap.medium};
  display: inline-block;
  border-bottom: 3px solid ${props => props.theme.colors.main};
  user-select: none;
  &:active {
    opacity: 0.6;
  }
`;

const ArticleContainer = styled.div`
  ${articleContainer};
`;

interface IProps {
  children: ReactNode;
}

export default ({ children }: IProps) => {
  const { isMe, otherUser } = useContext(UserContext);
  const { name, introduce } = useSelector((state: AppState) => state.user);
  const isLogged = useSelector((state: AppState) => state.user.id !== -1);
  const { loading: cLoading, process: cProcess } = useApi(followApi.create, 'home');
  const { loading: rLoading, process: rProcess } = useApi(followApi.remove, 'home');
  const [_isFollow, setIsFollow] = useState(otherUser && otherUser.isFollow);
  const dispatch = useDispatch();
  const handleCreate = () => {
    if (otherUser === null) return;
    cProcess({ whom: otherUser.id }).then(() => {
      setIsFollow(1);
      dispatch(PushFollow({ id: otherUser.id, name: otherUser.name, avatar: otherUser.avatar }));
    });
  };
  const handleRemove = () => {
    if (otherUser === null) return;
    if (!window.confirm('팔로우를 취소하시겠습니까?')) return;
    rProcess({ whom: otherUser.id }).then(() => {
      setIsFollow(null);
      dispatch(RemoveFollow({ id: otherUser.id }));
    });
  };
  const getIntroduce = () => {
    const noIntroduce = '소개글이 없습니다...';
    if (isMe) return introduce || noIntroduce;
    return (otherUser && otherUser.introduce) || noIntroduce;
  };
  return (
    <Container>
      <Top>
        <InfoContainer>
          {isMe ? <MyAvatar page="user" /> : <OtherAvatar url={otherUser && otherUser.avatar} />}
          <TextContainer>
            <NameContainer>
              <Name>{isMe ? name : otherUser && otherUser.name}</Name>
              {isMe ? (
                <EditProfile to="/user/edit">프로필 수정</EditProfile>
              ) : (
                isLogged && (
                  <Button
                    theme={_isFollow === 1 ? 'border' : 'withBg'}
                    onClick={_isFollow === 1 ? handleRemove : handleCreate}
                    loading={_isFollow === 1 ? rLoading : cLoading}
                  >
                    {_isFollow === 1 ? '팔로잉' : '팔로우'}
                  </Button>
                )
              )}
            </NameContainer>
            <Introduce>{getIntroduce()}</Introduce>
          </TextContainer>
        </InfoContainer>
        <Nav>
          <Item>
            <span>게시물</span>
          </Item>
        </Nav>
      </Top>
      <ArticleContainer>{children}</ArticleContainer>
    </Container>
  );
};
