import React, { ReactNode, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import linkCss from 'styles/mixins/link';
import MyAvatar from 'components/User/Avatar';
import { MainHeightAboveLg, mainHeightBelowLg, articleContainer } from 'styles/mixins/etc';
import { UserContext } from 'pages/User';
import tempAvatar from 'assets/avatar.png';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';

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

const OtherAvatar = styled.img`
  width: ${props => props.theme.avatarSize.user};
  height: ${props => props.theme.avatarSize.user};
  border-radius: ${props => props.theme.borderRadius.avatar};
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

  const getIntroduce = useMemo(() => {
    const placeholder = '소개글이 없습니다...';
    if (isMe) return introduce || placeholder;
    if (otherUser) return otherUser.introduce || placeholder;
    return placeholder;
  }, [isMe ? introduce : otherUser && otherUser.introduce]);

  return (
    <Container>
      <Top>
        <InfoContainer>
          {isMe ? (
            <MyAvatar page="user" />
          ) : (
            <OtherAvatar src={(otherUser && otherUser.avatar) || tempAvatar} />
          )}
          <TextContainer>
            <NameContainer>
              <Name>{isMe ? name : otherUser && otherUser.name}</Name>
              {isMe && <EditProfile to="/user/edit">프로필 수정</EditProfile>}
            </NameContainer>
            <Introduce>{getIntroduce}</Introduce>
          </TextContainer>
        </InfoContainer>
        <Nav>
          <Item>
            <span>내 글</span>
          </Item>
        </Nav>
      </Top>
      <ArticleContainer>{children}</ArticleContainer>
    </Container>
  );
};
