import React, { useEffect } from 'react';
import HomeTemplate from 'components/Templates/Common/Home';
import UserEditTemp from 'components/Templates/UserEdit';
import EditProfile from 'components/User/EditProfile';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducer';
import ChangePwd from 'components/User/ChangePwd';
import { setEditType } from 'store/userEdit/actions';

export default () => {
  const { editType } = useSelector((state: AppState) => state.userEdit);
  const dispatch = useDispatch();
  useEffect(
    () => () => {
      // 비밀번호 변경 누르고 홈으로 간 후 다시 돌아올 경우 첫 번째 프로필변경이 선택되어져 있게끔
      dispatch(setEditType('profile'));
    },
    [],
  );
  return (
    <HomeTemplate>
      <UserEditTemp>{editType === 'profile' ? <EditProfile /> : <ChangePwd />}</UserEditTemp>
    </HomeTemplate>
  );
};
