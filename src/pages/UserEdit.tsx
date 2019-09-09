import React, { useEffect } from 'react';
import HomeTemplate from 'components/Templates/Home';
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
