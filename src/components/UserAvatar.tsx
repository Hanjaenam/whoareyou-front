import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import AvatarImage from 'assets/avatar.png';
import { userApi } from 'utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducer';
import { useApi } from 'hooks';
import { setMessage } from 'store/notification/actions';
import { patchUser } from 'store/user/actions';
import { PatchAvatarRes } from 'types/apiResponse';

interface IProps {
  id?: string;
  avatar: string | null;
  page: 'user' | 'userEdit';
}

const Avatar = styled.div<{ url: string | null; page: 'user' | 'userEdit' }>`
  position: relative;
  border-radius: 25%;
  border: 1px solid ${props => props.theme.colors.secondary};
  background-image: ${props =>
    props.url ? `url(${props.url})` : `url(${AvatarImage})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
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

export default ({ id, avatar, page }: IProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const dispatch = useDispatch();
  const [visibleAddAvatar, setVisible] = useState(page === 'userEdit');
  const { process, loading } = useApi(userApi.patchAvatar);
  const { id: userId, name } = useSelector((state: AppState) => state.user);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files ? e.target.files[0] : null;
    if (image === null) return;
    const formData = new FormData();
    formData.append('avatar', image);
    formData.append('id', userId.toString(10));
    formData.append('name', name);
    process({ formData }).then(({ data }: PatchAvatarRes) => {
      dispatch(patchUser({ avatar: data }));
      dispatch(setMessage({ type: 'success', value: '수정되었습니다.' }));
    });
  };

  return (
    <Avatar
      url={avatar}
      page={page}
      onMouseEnter={page === 'user' ? () => setVisible(true) : undefined}
      onMouseLeave={page === 'user' ? () => setVisible(false) : undefined}
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
        id={id}
        ref={inputRef as any}
        onChange={onChange}
      />
    </Avatar>
  );
};
