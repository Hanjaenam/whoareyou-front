import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import linkCss from 'styles/mixins/link';
import UserAvatar from 'components/User/Avatar';
import { MainHeightAboveLg, mainHeightBelowLg } from 'styles/mixins/etc';

interface IProps {
  id: string;
  name: string;
  introduce: string | null;
  avatar: string | null;
  children?: ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: ${MainHeightAboveLg};
  @media screen and (max-width: ${props => props.theme.breakpoints.lg}) {
    min-height: ${mainHeightBelowLg};
  }
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

const Introduce = styled.p<{ isNull: boolean }>`
  text-indent: ${props => props.theme.gap.medium};
  ${props =>
    props.isNull &&
    css`
      color: ${props.theme.colors.secondary};
    `}
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

const Children = styled.div`
  flex: 1;
  background-color: white;
`;

export default ({ id, avatar, name, introduce, children }: IProps) => (
  <Container>
    <div>
      <InfoContainer>
        <UserAvatar avatar={avatar} page="user" />
        <TextContainer>
          <NameContainer>
            <Name>{name}</Name>
            <EditProfile to={`/user/${id}/edit`}>프로필 수정</EditProfile>
          </NameContainer>
          <Introduce isNull={introduce === null}>{introduce || '소개글이 없습니다...'}</Introduce>
        </TextContainer>
      </InfoContainer>
      <Nav>
        <Item>
          <span>내 글</span>
        </Item>
      </Nav>
    </div>
    <Children>{children}</Children>
  </Container>
);
