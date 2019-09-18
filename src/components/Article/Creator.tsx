import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Button from 'components/Common/Button';
import tempAvatar from 'assets/avatar.png';
import { faExpand, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useData } from 'context/article';
import { UserContext } from 'pages/User';

const Container = styled.div`
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

const Creator = styled.p``;

const CreatedAt = styled.p`
  opacity: 0.5;
  font-size: ${props => props.theme.fontSize.small};
  margin-top: ${props => props.theme.gap.tiny};
`;

const Func = styled.div`
  display: flex;
`;

export default () => {
  const data = useData();
  if (data === null) return null;
  const { creator, createdAt } = data;
  const { isMe } = useContext(UserContext);
  return (
    <Container>
      <Avatar url={creator.avatar} />
      <AuthorContainer>
        <div>
          <Creator>{creator.name}</Creator>
          <CreatedAt>{moment(createdAt).fromNow()}</CreatedAt>
        </div>
        <Func>
          <Button icon={faExpand} theme="noBg" onClick={() => null} />
          {isMe && (
            <>
              <Button icon={faEdit} theme="noBg" onClick={() => null} />
              <Button icon={faTrash} color="danger" theme="noBg" onClick={() => null} />
            </>
          )}
        </Func>
      </AuthorContainer>
    </Container>
  );
};
