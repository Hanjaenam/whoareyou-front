import React from 'react';
import styled from 'styled-components';
import Button from 'components/Common/Button';
import tempAvatar from 'assets/avatar.png';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

interface IProps {
  avatar: string | null;
  creator: string;
  createdAt: string;
}

const Top = styled.div`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.gap.small};
`;

interface IAvatar {
  url?: string | null;
}
const Avatar = styled.div<IAvatar>`
  background-image: ${props => (props.url ? `url(${props.url})` : `url(${tempAvatar})`)};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  border-radius: ${props => props.theme.borderRadius.avatar};
  display: inline-block;
`;

const AuthorContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: ${props => props.theme.gap.small};
`;

const Author = styled.p``;

const CreatedAt = styled.p`
  opacity: 0.5;
  font-size: ${props => props.theme.fontSize.small};
  margin-top: ${props => props.theme.gap.tiny};
`;

export default ({ avatar, creator, createdAt }: IProps) => (
  <Top>
    <Avatar url={avatar} />
    <AuthorContainer>
      <div>
        <Author>{creator}</Author>
        <CreatedAt>{moment(createdAt).fromNow()}</CreatedAt>
      </div>
      <Button icon={faExpand} theme="noBg" onClick={() => null} />
    </AuthorContainer>
  </Top>
);
