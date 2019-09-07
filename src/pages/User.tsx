import React from 'react';
import HomeTemplate from 'components/Templates/Home';
import UserTemplate from 'components/Templates/User';
import { useSelector } from 'react-redux';
import { AppState } from 'store/reducer';

export default () => {
  const user = useSelector((state: AppState) => state.user);
  return (
    <HomeTemplate>
      <UserTemplate
        id={user.id}
        name={user.name}
        avatar={user.avatar}
        introduce={user.introduce}
      />
    </HomeTemplate>
  );
};
