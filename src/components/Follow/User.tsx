import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Follow } from 'types/apiRes/user';
import TempAvatar from 'assets/avatar.png';
import { useApi } from 'hooks';
import followApi from 'api/follow';
import { useDispatch } from 'react-redux';
import Button from '../Common/Button';
import { PushFollow, RemoveFollow } from 'store/user/actions';

const Container = styled.div`
  display: flex;
  align-items: center;
  & + & {
    margin-top: ${props => props.theme.gap.small};
  }
`;

const Avatar = styled(Link)``;

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: ${props => props.theme.borderRadius.avatar};
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    width: 60px;
    height: 60px;
  }
`;

const Center = styled(Link)`
  text-decoration: none;
  flex: 1;
  margin: 0 ${props => props.theme.gap.small};
`;

const Name = styled.div`
  font-weight: bold;
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 14px;
  }
`;

const Introduce = styled.p`
  font-size: ${props => props.theme.fontSize.small};
  margin-top: ${props => props.theme.gap.tiny};
  color: #999;
`;

export default ({ id, name, avatar, introduce, isFollow }: Follow) => {
  const dispatch = useDispatch();
  const [_isFollow, setIsFollow] = useState(isFollow);
  const { loading: cLoading, process: cProcess } = useApi(followApi.create, 'home');
  const { loading: rLoading, process: rProcess } = useApi(followApi.remove, 'home');
  const handleCreate = () => {
    cProcess({ whom: id }).then(() => {
      setIsFollow(1);
      dispatch(PushFollow({ id, name, avatar }));
    });
  };
  const handleRemove = () => {
    if (!window.confirm('팔로우를 취소하시겠습니까?')) return;
    rProcess({ whom: id }).then(() => {
      setIsFollow(null);
      dispatch(RemoveFollow({ id }));
    });
  };
  return (
    <Container>
      <Avatar to={`/user/${id}`}>
        <Image src={avatar || TempAvatar} alt="프로필" />
      </Avatar>
      <Center to={`/user/${id}`}>
        <Name>{name}</Name>
        <Introduce>{introduce}</Introduce>
      </Center>
      <Button
        theme={_isFollow === 1 ? 'border' : 'withBg'}
        onClick={_isFollow === 1 ? handleRemove : handleCreate}
        padding="tiny"
        loading={_isFollow === 1 ? rLoading : cLoading}
      >
        {_isFollow === 1 ? '팔로잉' : '팔로우'}
      </Button>
    </Container>
  );
};
