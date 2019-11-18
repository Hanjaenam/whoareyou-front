import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import userApi from 'api/user';
import { logIn } from 'store/user/actions';
import { AxiosError } from 'axios';
import Notification from 'components/Common/Notification';
import { State } from 'store/user/types';
import Routes from './Routes';

export default () => {
  // token이 있을 경우 페이지 깜빡임 문제 해결
  // GET_ME에서 데이터 모두 가져온 이후에 렌더링 하게끔
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // 처음 들어올 때 get user
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      userApi
        .getMe()
        .then(({ data }: { data: State }) => dispatch(logIn(data)))
        .catch((err: AxiosError) => {
          if (err.response && err.response.status === 401) window.localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Router>
      <>
        {!loading && <Routes />}
        <Notification />
      </>
    </Router>
  );
};
