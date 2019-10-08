import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import userApi from 'api/user';
import { useDispatch, useSelector } from 'react-redux';
import { useApi } from 'hooks';
import { setMessage } from 'store/notification/actions';
import { patchUser } from 'store/user/actions';
import Loader from 'components/Common/Loader';
import { AppState } from 'store/reducer';
import avatarCss from 'styles/mixins/avatar';

interface IAvatar {
  url: string | null;
  page: 'user' | 'userEdit';
  status: { loading: boolean };
}

const Avatar = styled.div<IAvatar>`
  ${props => avatarCss({ url: props.url, page: props.page })}
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    border-bottom-right-radius: ${props => (props.page === 'user' ? '35px' : '45p')};
    border-bottom-left-radius: ${props => (props.page === 'user' ? '35px' : '45p')};
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    > button {
      border-bottom-right-radius: ${props => (props.page === 'user' ? '25px' : '35px')};
      border-bottom-left-radius: ${props => (props.page === 'user' ? '25px' : '35px')};
    }
  }
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
    `};
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

interface IProps {
  page: 'user' | 'userEdit';
}

export default ({ page }: IProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const dispatch = useDispatch();
  const [visibleAddAvatar, setVisible] = useState(page === 'userEdit');
  const { process, loading } = useApi(userApi.patchAvatar, 'home');
  const { avatar } = useSelector((state: AppState) => state.user);

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
