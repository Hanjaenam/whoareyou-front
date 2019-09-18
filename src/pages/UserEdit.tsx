import React, { useEffect, useState } from 'react';
import HomeTemplate from 'components/Templates/Common/Home';
import UserEditTemp from 'components/Templates/UserEdit';
import EditProfile from 'components/User/EditProfile';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/reducer';
import ChangePwd from 'components/User/ChangePwd';
import { setEditType } from 'store/userEdit/actions';

interface IProps {
  match: { params: { id: string } };
  history: { goBack: () => void };
}

export default ({
  match: {
    params: { id },
  },
  history: { goBack },
}: IProps) => {
  const { editType } = useSelector((state: AppState) => state.userEdit);
  const isMe = useSelector((state: AppState) => state.user.id === Number(id));
  const [render, setRender] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMe) setRender(true);
    else goBack();
    return () => {
      // 비밀번호 변경 누르고 홈으로 간 후 다시 돌아올 경우 첫 번째 프로필변경이 선택되어져 있게끔
      dispatch(setEditType('profile'));
    };
  }, []);

  return render ? (
    <HomeTemplate>
      <UserEditTemp>{editType === 'profile' ? <EditProfile /> : <ChangePwd />}</UserEditTemp>
    </HomeTemplate>
  ) : null;
};
