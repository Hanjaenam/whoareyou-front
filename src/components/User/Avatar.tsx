import React, { useRef, useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import tempAvatar from 'assets/avatar.png';
import userApi from 'api/user';
import { useDispatch } from 'react-redux';
import { useApi } from 'hooks';
import { setMessage } from 'store/notification/actions';
import { patchUser } from 'store/user/actions';
import Loader from 'components/Common/Loader';
import { UserContext } from 'pages/User';

interface IProps {
  avatar: string | null;
  page: 'user' | 'userEdit';
}

interface IAvatar {
  url: string | null;
  page: 'user' | 'userEdit';
  status: { loading: boolean };
}

const Avatar = styled.div<IAvatar>`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.avatar};
  border: 1px solid ${props => props.theme.colors.secondary};
  background-image: ${props => (props.url ? `url(${props.url})` : `url(${tempAvatar})`)};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props =>
    props.page === 'user'
      ? css`
          width: ${props.theme.userAvatarSize.userPage.xl};
          height: ${props.theme.userAvatarSize.userPage.xl};
          > button {
            border-bottom-right-radius: 35px;
            border-bottom-left-radius: 35px;
          }
          @media screen and (max-width: ${props.theme.breakpoints.md}) {
            width: ${props.theme.userAvatarSize.userPage.md};
            height: ${props.theme.userAvatarSize.userPage.md};
            > button {
              border-bottom-right-radius: 25px;
              border-bottom-left-radius: 25px;
            }
          }
        `
      : css`
          width: ${props.theme.userAvatarSize.userEditPage.xl};
          height: ${props.theme.userAvatarSize.userEditPage.xl};
          > button {
            border-bottom-right-radius: 45px;
            border-bottom-left-radius: 45px;
          }
          @media screen and (max-width: ${props.theme.breakpoints.md}) {
            width: ${props.theme.userAvatarSize.userEditPage.md};
            height: ${props.theme.userAvatarSize.userEditPage.md};
            > button {
              border-bottom-right-radius: 35px;
              border-bottom-left-radius: 35px;
            }
          }
        `}
  ${props =>
    props.status.loading &&
    css`
      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
      }
    `}
`;

const AddAvatar = styled.button`
  border: 0;
  outline: none;
  transition: 0.2s;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 30%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: black;
  }
`;

const Text = styled.p`
  font-size: ${props => props.theme.fontSize.medium};
  color: white;
`;

const Input = styled.input<{ ref: React.MutableRefObject<undefined> }>`
  display: none;
`;

export default ({ avatar, page }: IProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const dispatch = useDispatch();
  const [visibleAddAvatar, setVisible] = useState(page === 'userEdit');
  const { process, loading } = useApi(userApi.patchAvatar, 'home');
  const { isMe } = useContext(UserContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files ? e.target.files[0] : null;
    if (image === null) return;
    const formData = new FormData();
    formData.append('avatar', image);
    process({ formData }).then(({ data }: { data: string }) => {
      dispatch(patchUser({ avatar: data }));
      dispatch(setMessage({ type: 'success', value: '수정되었습니다.' }));
    });
  };
  // page 가 user 이고 내 정보가 아니면 아바타만
  if (page === 'user' && !isMe)
    return <Avatar url={avatar} page={page} status={{ loading: false }} />;
  // 그 이외
  // 1. page === user 이고 내 정보
  // 2. page === userEdit일 때 (isMe 상관 없음)
  return (
    <Avatar
      url={avatar}
      page={page}
      onMouseEnter={page === 'user' ? () => setVisible(true) : undefined}
      onMouseLeave={page === 'user' ? () => setVisible(false) : undefined}
      status={{ loading }}
    >
      {visibleAddAvatar ? (
        <AddAvatar onClick={() => inputRef.current && inputRef.current.click()}>
          <Text>{avatar === null ? '사진추가' : '수정'}</Text>
        </AddAvatar>
      ) : null}
      <Input
        type="file"
        accept="image/jpeg,image/png"
        name="avatar"
        ref={inputRef as any}
        onChange={onChange}
      />
      {loading && <Loader size={1.5} />}
    </Avatar>
  );
};
